import { Button } from "antd";
import { TSales, TSalesColumn } from "../types";
import { ISalesData } from "../pages/sale/SalesManagement";

type TSalesColumnProps = {
  setInvoiceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSaleData: React.Dispatch<React.SetStateAction<ISalesData | undefined>>;
};
const SalesColumn = ({ setInvoiceModalOpen, setSaleData }: TSalesColumnProps) => {
  const column: TSalesColumn[] = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "product",
      title: "Product",
      dataIndex: "product",
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      key: "date",
      title: "Date",
      dataIndex: "date",
      filterMode: "tree",
      filterMultiple: false,
      filteredData: ["last week", "last month", "last year"],

      filters: [
        {
          text: "last week",
          value: "last week",
        },
        {
          text: "last month",
          value: "last month",
        },
        {
          text: "last year",
          value: "last year",
        },
      ],
      onFilter: (value: string, record: TSales) => {
        const currentDate = new Date();

        const recordDate = new Date(record.date);

        if (value === "last week") {
          const lastWeekDate = new Date();
          lastWeekDate.setDate(currentDate.getDate() - 7);
          return recordDate >= lastWeekDate && recordDate <= currentDate;
        }

        if (value === "last month") {
          const lastMonthDate = new Date();
          lastMonthDate.setMonth(currentDate.getMonth() - 1);
          return recordDate >= lastMonthDate && recordDate <= currentDate;
        }

        if (value === "last year") {
          const lastYearDate = new Date();
          lastYearDate.setFullYear(currentDate.getFullYear() - 1);
          return recordDate >= lastYearDate && recordDate <= currentDate;
        }

        return true;
      },
      render: (value: string) => {
        return <span>{new Date(value).toLocaleDateString()}</span>;
      },
    },
    {
      key: "invoice",
      title: "Invoice",
      dataIndex: "invoice",
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              setSaleData(record as ISalesData);
              setInvoiceModalOpen(true);
            }}
            type="primary"
          >
            Invoice
          </Button>
        );
      },
    },
  ];
  return column;
};

export default SalesColumn;
