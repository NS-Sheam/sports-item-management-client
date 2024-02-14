/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Table, TableProps } from "antd";
import { useGetSalesQuery } from "../../redux/features/sales/salesApi";
import SalesColumn from "../../components/SalesColumn";
import { TSales, TSalesColumn } from "../../types/sales";

import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types";
import { useState } from "react";
import { TQueryParams } from "../../types/global";
import dayjs from "dayjs";

interface ISalesData extends TSales {
  key: string;
}

const SalesManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);

  const [page, setPage] = useState(1);
  const columns = SalesColumn();
  const { data: items, isLoading: isSalesDataLoading } = useGetSalesQuery([
    { name: "page", value: page },
    { name: "limit", value: 5 },
    ...params,
  ]);

  const { data: products, isLoading: isProductLoading } = useGetProductsQuery([]);

  const data = items?.data?.map((item: ISalesData) => ({
    key: item._id,
    name: item.name,
    product: products?.data?.find((product: TProduct) => product._id === item.product)?.name,
    price: "$" + products?.data?.find((product: TProduct) => product._id === item.product)?.price,
    quantity: item.quantity,
    createdAt: new Date(item.createdAt),
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
  const metaData = items?.meta;
  return (
    <div className="space-y-4">
      <h1 className="text-xl lg:text-2xl font-bold ">Sales Management</h1>
      <Table
        scroll={{ x: 400 }}
        columns={columns as any}
        dataSource={data}
        onChange={onChange}
        pagination={false}
        loading={isProductLoading || isSalesDataLoading}
      />
      <Pagination
        style={{ marginTop: "1rem" }}
        current={page}
        onChange={(value) => setPage(value)}
        total={metaData?.total}
        pageSize={metaData?.limit}
      />
    </div>
  );
};

export default SalesManagement;
