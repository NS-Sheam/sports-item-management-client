/* eslint-disable @typescript-eslint/no-explicit-any */
import AddOrEditItemFrom from "../../components/form/AddOrEditItemForm";

import { useState } from "react";
import { useDeleteProductMutation, useGetProductsQuery } from "../../redux/features/product/productApi";
import { Button, Pagination, Table, Select } from "antd";
import ItemColumn from "../../components/ItemColumn";
import { toast } from "sonner";
import { useAddSalesMutation } from "../../redux/features/sales/salesApi";
import SalesFrom from "../../components/form/SalesFrom";
import PdfComponent from "../../components/PdfComponent";
import { useAppSelector } from "../../redux/hooks";
import { TProduct, TSales } from "../../types";
import { TQueryParams, TResponse } from "../../types/global";
import { TableRowSelection } from "antd/es/table/interface";
import { ISalesData } from "../sale/SalesManagement";
import GenericItemModal from "../../components/modal/GenericItemModal";
import Search from "antd/es/input/Search";

const { Option } = Select;

const ItemManagement = () => {
  const { role, branch } = useAppSelector((state) => state.auth.user!);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD"); // Default currency is USD
  const exchangeRates = {
    USD: { rate: 1, sign: "$" },
    BDT: { rate: 85, sign: "৳" },
    INR: { rate: 74, sign: "₹" },
    EUR: { rate: 0.84, sign: "€" },
    GBP: { rate: 0.74, sign: "£" },
    JPY: { rate: 109.57, sign: "¥" },
    AUD: { rate: 1.35, sign: "A$" },
    CAD: { rate: 1.25, sign: "C$" },
    CHF: { rate: 0.91, sign: "CHF" },
    CNY: { rate: 6.45, sign: "¥" },
    SEK: { rate: 8.61, sign: "kr" },
    NZD: { rate: 1.43, sign: "NZ$" },
    ZAR: { rate: 14.57, sign: "R" },
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const convertPrice = (price: number) => {
    const rate = exchangeRates[selectedCurrency as keyof typeof exchangeRates].rate;

    return price * rate || 0;
  };

  const { data: items, isLoading: productIsLoading } = useGetProductsQuery([
    { name: "page", value: page },
    { name: "limit", value: 5 },
    { name: "branch", value: role === "manager" ? branch! : "" },
    { name: "searchTerm", value: searchTerm },

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

  const handleSell = async (data: any) => {
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
    currencySign: exchangeRates[selectedCurrency as keyof typeof exchangeRates].sign,
  });
  const metaData = items?.meta;

  const productData = items?.data?.map((item: TProduct) => {
    return {
      ...item,
      price: convertPrice(item?.price),
    };
  });

  const rowSelection: TableRowSelection<TProduct> = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedProductId(selectedRowKeys.map(String));
    },
    type: "checkbox",
  };

  const onChange = (_pagination: any, filters: any, _sorter: any, extra: any) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      Object.keys(filters)?.forEach((item) => {
        filters[item]?.forEach((value: string) => {
          queryParams.push({ name: item, value });
        });
      });

      setParams(queryParams);
    }
    if (extra.action === "sort") {
      const queryParams: TQueryParams[] = [];
      const sorter = _sorter as any;
      if (sorter.order) {
        queryParams.push({ name: "sort", value: sorter.order === "ascend" ? "-price" : "price" });
      }
      setParams(queryParams);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl lg:text-2xl font-bold ">Item Management</h1>
      <div style={{ marginBottom: "1rem" }}>
        <Select
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <Option value="USD">USD</Option>
          <Option value="BDT">BDT</Option>
          <Option value="INR">INR</Option>
          <Option value="EUR">EUR</Option>
          <Option value="GBP">GBP</Option>
          <Option value="AUD">AUD</Option>
          <Option value="JPY">JPY</Option>
          <Option value="CNY">CNY</Option>
          <Option value="MXN">MXN</Option>
        </Select>
      </div>
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
      <div>
        <Search
          style={{ width: "20rem" }}
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
