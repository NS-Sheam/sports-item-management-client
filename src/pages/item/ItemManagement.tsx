/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteProductMutation, useGetProductsQuery } from "../../redux/features/product/productApi";
import { Button, Pagination, Table, TableProps } from "antd";
import ItemColumn from "../../components/ItemColumn";
import { useState } from "react";
import GenericItemModal from "../../components/modal/GenericItemModal";
import { toast } from "sonner";
import AddOrEditItemFrom from "../../components/form/AddOrEditItemForm";
import { useAddSalesMutation } from "../../redux/features/sales/salesApi";

import { FieldValues } from "react-hook-form";
import SalesFrom from "../../components/form/SalesFrom";
import { TProduct, TProductColumn, TSales } from "../../types";
import { TQueryParams, TResponse } from "../../types/global";
import { TableRowSelection } from "antd/es/table/interface";
import { ISalesData } from "../sale/SalesManagement";
import PdfComponent from "../../components/PdfComponent";
import { useAppSelector } from "../../redux/hooks";
const ItemManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const { data: items, isLoading: productIsLoading } = useGetProductsQuery([
    { name: "page", value: page },
    { name: "limit", value: 5 },
    ...params,
  ]);

  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState<TProduct>({} as TProduct);
  const [deleteProduct] = useDeleteProductMutation();
  const [addSales] = useAddSalesMutation();
  const [selectedProductId, setSelectedProductId] = useState<string[]>([]);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [saleData, setSaleData] = useState<ISalesData>();
  const { role } = useAppSelector((state) => state.auth.user!);

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Loading...");
    try {
      if (selectedProductId.length > 0) {
        selectedProductId.forEach(async (id) => {
          await deleteProduct(id);
        });
      } else await deleteProduct(id);
      toast.success("Product deleted successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleSell = async (data: FieldValues) => {
    const toastId = toast.loading("Loading...");
    data.product = defaultValue._id;
    data.quantity = Number(data.quantity);
    data.date = new Date(data.date).toISOString();
    try {
      const res = (await addSales(data)) as TResponse<TSales>;

      if (res?.error) {
        throw new Error((res as any)?.error?.data.message);
      }
      const salesModalData = {
        name: res.data!.name,
        product: defaultValue.name,
        price: defaultValue.price,
        date: data.date,
        quantity: data.quantity,
      } as ISalesData;

      setSaleData(salesModalData);
      setIsSellModalOpen(false);
      setInvoiceModalOpen(true);
      toast.success("Operation successfull!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const columns = ItemColumn({
    setModalType,
    setIsModalOpen,
    setDefaultValue,
    handleDelete,
    setIsSellModalOpen,
  });
  const metaData = items?.meta;

  const productData = items?.data?.map((item: TProduct) => {
    return {
      _id: item._id,
      name: item.name,
      brand: item.brand,
      branch: item.branch,
      type: item.type,
      style: item.style,
      material: item.material,
      color: item.color,
      size: item.size,
      condition: item.condition,
      price: item.price,
      quantity: item.quantity,
      weight: item.weight,
      image: item?.image,
    };
  });

  const rowSelection: TableRowSelection<TProduct> = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedProductId(selectedRowKeys.map(String));
    },
    type: "checkbox",
  };
  const onChange: TableProps<TProductColumn>["onChange"] = (_pagination, filters, _sorter, extra) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      Object.keys(filters)?.forEach((item) => {
        filters[item]?.forEach((value) => {
          queryParams.push({ name: item, value });
        });
      });

      setParams(queryParams);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl lg:text-2xl font-bold ">Item Management</h1>
      {role !== "seller" && (
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setDefaultValue({} as TProduct);
          }}
          className="bg-blue-600 hover: hover:bg-white text-white hover:text-blue-600"
        >
          Add Product
        </Button>
      )}
      {selectedProductId.length > 0 && (
        <Button
          onClick={() => handleDelete("")}
          className="bg-red-600 hover: hover:bg-white text-white hover:text-red-600"
        >
          Delete Product
        </Button>
      )}
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        onChange={onChange as any}
        scroll={{ x: 400 }}
        columns={columns}
        dataSource={productData}
        rowKey="_id"
        loading={productIsLoading}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: "1rem" }}
        current={page}
        onChange={(value) => setPage(value)}
        total={metaData?.total}
        pageSize={metaData?.limit}
      />
      <GenericItemModal
        title="Add Product"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <AddOrEditItemFrom
          defaultValues={defaultValue}
          modalType={modalType}
          setIsModalOpen={setIsModalOpen}
        />
      </GenericItemModal>
      <GenericItemModal
        title={defaultValue.name + ` (${defaultValue.quantity}) items left`}
        isModalOpen={isSellModalOpen}
        setIsModalOpen={setIsSellModalOpen}
      >
        <SalesFrom
          product={defaultValue}
          handleSell={handleSell}
          setIsModalOpen={setIsSellModalOpen}
        />
      </GenericItemModal>
      <GenericItemModal
        title="Invoice"
        isModalOpen={invoiceModalOpen}
        setIsModalOpen={setInvoiceModalOpen}
      >
        <PdfComponent saleData={saleData!} />
      </GenericItemModal>
    </div>
  );
};

export default ItemManagement;
