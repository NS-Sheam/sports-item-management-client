import { TProductColumnItem } from "../types";

export const ProductTypes = [
  "Apparel",
  "Footwear",
  "Equipment",
  "Accessories",
  "Fitness and Training",
  "Outdoor Sports",
  "Team Sports",
  "Water Sports",
  "Other",
];

export const ProductConditions = ["New", "Used", "Refurbished"];

export const ProductColors = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Pink",
  "Brown",
  "White",
  "Black",
  "Gray",
  "Silver",
  "Gold",
  "Beige",
  "Cream",
  "Other",
];

export const ProductSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "Other"];

export const ProductMaterials = [
  "Polyester",
  "Spandex",
  "Cotton",
  "Nylon",
  "Mesh",
  "Leather",
  "Synthetic leather",
  "Rubber",
  "EVA foam",
  "Metal",
  "Plastic",
  "Wood",
  "Fiberglass",
  "Carbon fiber",
  "Neoprene",
  "Silicone",
  "Foam",
  "Vinyl",
  "Steel",
  "Gore-Tex",
  "Canvas",
  "Ripstop",
  "Other",
];

export const ProductStyles = ["Casual", "Sport", "Formal", "Other"];
export const productSearchableFields = ["name", "type", "brand", "condition", "size", "material", "color", "condition"];

export const productColumnsItem: TProductColumnItem[] = [
  {
    title: "Name",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "Type",
    dataIndex: "type",
    width: "20%",
    filter: true,
    filteredData: ProductTypes,
  },
  {
    title: "Style",
    dataIndex: "style",
    width: "6%",
    filter: true,
    filteredData: ProductStyles,
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "8%",
    sort: true,
  },
  {
    title: "Action",
    dataIndex: "action",
    actions: true,
    width: "16%",
  },
];
