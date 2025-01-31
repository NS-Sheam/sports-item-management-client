import { SetStateAction } from "react";
import { productColumnsItem } from "../utils/item.const";
import { Tag } from "antd";
import { TProduct, TProductColumn } from "../types";
import { useAppSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { TUser } from "../redux/features/auth/authSlice";

type TItemColumnProps = {
  setModalType: React.Dispatch<SetStateAction<"add" | "edit">>;
  setIsModalOpen: (value: boolean) => void;
  setDefaultValue: React.Dispatch<SetStateAction<TProduct>>;
  handleDelete: (id: string) => Promise<void>;
  currencySign: string;

  setIsSellModalOpen: React.Dispatch<SetStateAction<boolean>>;
};
const ItemColumn = ({
  setModalType,
  setIsModalOpen,
  setDefaultValue,
  handleDelete,
  setIsSellModalOpen,
  currencySign,
}: TItemColumnProps) => {
  const { token } = useAppSelector((state) => state.auth);
  const user = jwtDecode(token as string) as TUser;
  const { role } = user;

  return productColumnsItem?.map((column) => {
    const returnableColumn: TProductColumn = {
      key: column?.dataIndex,
      title: column?.title,
      dataIndex: column?.dataIndex,
      width: column?.width,
    };
    if (column?.filter) {
      returnableColumn.filters = column?.filteredData?.map((item) => {
        return {
          text: item,
          value: item,
        };
      });
      returnableColumn.filterMode = "tree";
      returnableColumn.filterSearch = true;
      returnableColumn.onFilter = (value: unknown, record: TProduct): boolean => {
        const dataIndex = column?.dataIndex as keyof TProduct;
        return record[dataIndex] === value;
      };
    }
    if (column?.sort) {
      returnableColumn.sorter = (a, b) => a.price - b.price;
      returnableColumn.render = (value) =>
        typeof value === "string" ||
        (typeof value === "number" && (
          <span>
            {currencySign}
            {value.toFixed(2)}
          </span>
        ));
    }
    if (column?.actions) {
      returnableColumn.render = (_, record) => (
        <div>
          {role === "manager" || role === "superAdmin" ? (
            <Tag
              className="cursor-pointer"
              color="green"
              onClick={() => {
                setModalType("edit");
                setIsModalOpen(true);
                setDefaultValue(record as TProduct);
              }}
            >
              Edit
            </Tag>
          ) : null}

          {role === "seller" || role === "superAdmin" ? (
            <Tag
              className="cursor-pointer"
              color="blue"
              onClick={() => {
                setDefaultValue(record as TProduct);
                setIsSellModalOpen(true);
              }}
            >
              Sell
            </Tag>
          ) : null}
          {role === "manager" ||
            (role === "superAdmin" && (
              <Tag
                className="cursor-pointer"
                color="red"
                onClick={() => handleDelete((record as TProduct)?._id)}
              >
                Delete
              </Tag>
            ))}
          {role === "manager" || role === "superAdmin" ? (
            <Tag
              className="cursor-pointer"
              color="yellow"
              onClick={() => {
                setModalType("add");
                setDefaultValue(record as TProduct);
                setIsModalOpen(true);
              }}
            >
              Duplicate
            </Tag>
          ) : null}
        </div>
      );
    }
    return returnableColumn;
  });
};

export default ItemColumn;
