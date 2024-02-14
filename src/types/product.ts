import { ReactNode } from "react";

export type TProductType =
  | "Apparel"
  | "Footwear"
  | "Equipment"
  | "Accessories"
  | "Fitness and Training"
  | "Outdoor Sports"
  | "Team Sports"
  | "Water Sports"
  | "Other";
export type TProductCondition = "New" | "Used" | "Refurbished";
export type TProductColor =
  | "Red"
  | "Orange"
  | "Yellow"
  | "Green"
  | "Blue"
  | "Purple"
  | "Pink"
  | "Brown"
  | "White"
  | "Black"
  | "Gray"
  | "Silver"
  | "Gold"
  | "Beige"
  | "Cream"
  | "Other";
export type TProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "Other";
export type TProductMaterial =
  | "Polyester"
  | "Spandex"
  | "Cotton"
  | "Nylon"
  | "Mesh"
  | "Leather"
  | "Synthetic leather"
  | "Rubber"
  | "EVA foam"
  | "Metal"
  | "Plastic"
  | "Wood"
  | "Fiberglass"
  | "Carbon fiber"
  | "Neoprene"
  | "Silicone"
  | "Foam"
  | "Vinyl"
  | "Steel"
  | "Gore-Tex"
  | "Canvas"
  | "Ripstop"
  | "Other";

export type TProductStyle = "Casual" | "Sport" | "Formal" | "Other";
export type TProduct = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  branch: string;
  image?: string;
  type?: TProductType;
  brand?: string;
  size?: TProductSize;
  material?: TProductMaterial;
  color?: TProductColor;
  condition?: TProductCondition;
  weight?: number;
  style?: TProductStyle;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProductColumnItem = {
  title: string;
  dataIndex: string;
  width: string;
  filter?: boolean;
  filteredData?: string[];
  sort?: boolean;
  actions?: boolean;
};

export type TProductColumn = {
  key?: string;
  title: string;
  dataIndex: string;
  width: string;
  filters?: {
    text: string;
    value: string;
  }[];
  filterMode?: "tree";
  filterSearch?: boolean;
  onFilter?: (value: unknown, record: TProduct) => boolean;
  sorter?: (a: TProduct, b: TProduct) => number;
  render?: (value: unknown, record: TProduct) => ReactNode;
};
