import { ReactNode } from "react";

export type TSales = {
  _id: number;
  name: string;
  product: string;
  quantity: number;
  createdAt: string;
};

export type TSalesColumn = {
  key: string;
  title: string;
  dataIndex: string;
  width: string;
  filters?: { text: string; value: string }[];
  filteredData?: string[];
  filterMode?: "tree";
  filterSearch?: boolean;
  onFilter?: (value: string, record: TSales) => boolean;
  render?: (value: string, record: TSales) => ReactNode;
};
// export type TProductColumn = {
//   key?: string;
//   title: string;
//   dataIndex: string;
//   width: string;
//   filters?: {
//     text: string;
//     value: string;
//   }[];
//   filterMode?: "tree";
//   filterSearch?: boolean;
//   onFilter?: (value: unknown, record: TProduct) => boolean;
//   sorter?: (a: TProduct, b: TProduct) => number;
//   render?: (value: unknown, record: TProduct) => ReactNode;
// };
