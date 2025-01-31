import { SetStateAction } from "react";
import { Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, CopyOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { productColumnsItem } from "../utils/item.const";
import { TProduct, TProductColumn } from "../types";
import { useAppSelector } from "../redux/hooks";
import { TUser } from "../redux/features/auth/authSlice";

type TItemColumnProps = {
  setModalType: React.Dispatch<SetStateAction<"add" | "edit">>;
  setIsModalOpen: (value: boolean) => void;
  setDefaultValue: React.Dispatch<SetStateAction<TProduct>>;
  handleDelete: (id: string) => Promise<void>;
  setIsSellModalOpen: React.Dispatch<SetStateAction<boolean>>;
  currencySign: string;
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
  const { role } = jwtDecode(token as string) as TUser;

  return productColumnsItem.map((column) => {
    const returnableColumn: TProductColumn = {
      key: column.dataIndex,
      title: column.title,
      dataIndex: column.dataIndex,
      width: column.width,
    };

    if (column.filter) {
      returnableColumn.filters = column.filteredData?.map((item) => ({
        text: item,
        value: item,
      }));
      returnableColumn.filterMode = "tree";
      returnableColumn.filterSearch = true;
      returnableColumn.onFilter = (value, record) => record[column.dataIndex as keyof TProduct] === value;
    }

    if (column.sort) {
      returnableColumn.sorter = (a, b) => a.price - b.price;
      returnableColumn.render = (value: any) =>
        typeof value === "number" ? (
          <span>
            {currencySign}
            {value.toFixed(2)}
          </span>
        ) : (
          value
        );
    }

    if (column.actions) {
      returnableColumn.render = (_, record) => {
        const actions = [
          (role === "manager" || role === "superAdmin") && (
            <Button
              key="edit"
              style={{
                background: "#93278f",
                color: "#fff",
              }}
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                setModalType("edit");
                setIsModalOpen(true);
                setDefaultValue(record);
              }}
            />
          ),
          (role === "seller" || role === "superAdmin") && (
            <Button
              key="sell"
              type="default"
              size="small"
              style={{ color: "#1890ff" }}
              icon={<ShoppingCartOutlined />}
              onClick={() => {
                setDefaultValue(record);
                setIsSellModalOpen(true);
              }}
            />
          ),
          (role === "manager" || role === "superAdmin") && (
            <Popconfirm
              key="delete"
              title="Are you sure to delete this item?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                key="delete"
                type="primary"
                danger
                size="small"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          ),
          (role === "manager" || role === "superAdmin") && (
            <Button
              key="duplicate"
              type="dashed"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => {
                setModalType("add");
                setDefaultValue(record);
                setIsModalOpen(true);
              }}
            />
          ),
        ];

        return <div className="flex gap-2">{actions.filter(Boolean)}</div>;
      };
    }

    return returnableColumn;
  });
};

export default ItemColumn;
