import { TSales, TSalesColumn } from "../types";

const SalesColumn = () => {
  const column: TSalesColumn[] = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      width: "30%",
    },
    {
      key: "product",
      title: "Product",
      dataIndex: "product",
      width: "20%",
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      width: "20%",
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
      width: "20%",
    },
    {
      key: "date",
      title: "Date",
      dataIndex: "date",
      width: "10%",
      filterMode: "tree",
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
  ];
  return column;
};

export default SalesColumn;
