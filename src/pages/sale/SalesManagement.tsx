/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableProps } from "antd";
import { useGetSalesQuery } from "../../redux/features/sales/salesApi";
import SalesColumn from "../../components/SalesColumn";
import { TSales, TSalesColumn } from "../../types/sales";

import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types";
import { useState } from "react";
import { TQueryParams } from "../../types/global";
import dayjs from "dayjs";
import GenericItemModal from "../../components/modal/GenericItemModal";
import PdfComponent from "../../components/PdfComponent";
import { useAppSelector } from "../../redux/hooks";
import CustomPagination from "../../components/form/CustomPagination";

export interface ISalesData extends TSales {
  key: string;
  price: number;
  branch: string;
}

const SalesManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [saleData, setSaleData] = useState<ISalesData>();

  const [page, setPage] = useState(1);
  const columns = SalesColumn({ setInvoiceModalOpen, setSaleData });

  const { role, branch } = useAppSelector((state) => state.auth.user!);

  const { data: items, isLoading: isSalesDataLoading } = useGetSalesQuery([
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "branch", value: role === "manager" ? branch! : "" },
    ...params,
  ]);

  const { data: products, isLoading: isProductLoading } = useGetProductsQuery([]);

  const data = items?.data?.map((item: ISalesData) => ({
    key: item._id,
    name: item.name,
    product: products?.data?.find((product: TProduct) => product._id === item.product)?.name,
    price: "$" + products?.data?.find((product: TProduct) => product._id === item.product)?.price,
    quantity: item.quantity,
    date: item.date,
  }));

  const onChange: TableProps<TSalesColumn>["onChange"] = (_pagination, filters, _sorter, extra) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.date?.forEach((item) => {
        queryParams.push({
          name: "dateRange",
          value:
            item === "last week"
              ? dayjs().subtract(1, "week").format("YYYY-MM-DD")
              : item === "last month"
              ? dayjs().subtract(1, "month").format("YYYY-MM-DD")
              : item === "last year"
              ? dayjs().subtract(1, "year").format("YYYY-MM-DD")
              : "",
        });
      });

      setParams(queryParams);
    }
  };
  const meta = items?.meta;
  return (
    <div className="space-y-4">
      <h1 className="text-xl lg:text-2xl font-bold text-primary">Sales Management</h1>
      <Table
        scroll={{ x: 400 }}
        columns={columns as any}
        dataSource={data}
        onChange={onChange}
        pagination={false}
        loading={isProductLoading || isSalesDataLoading}
      />
      <GenericItemModal
        title="Invoice"
        isModalOpen={invoiceModalOpen}
        setIsModalOpen={setInvoiceModalOpen}
      >
        <PdfComponent saleData={saleData!} />
      </GenericItemModal>
      <CustomPagination
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "1rem",
        }}
        page={page}
        setPage={setPage}
        total={meta?.total}
        pageSize={meta?.limit}
      />
    </div>
  );
};

export default SalesManagement;
