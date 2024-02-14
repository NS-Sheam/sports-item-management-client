import { Button, Form, Row, Select, Table } from "antd";
import { useGetAllUsersQuery, useUpdateUserRoleMutation } from "../../redux/features/user/userApi";
import GenericItemModal from "../../components/modal/GenericItemModal";
import CustomForm from "../../components/form/CustomForm";
import CustomSelect from "../../components/form/CustomSelect";
import { branches } from "../../utils/user.const";
import { useState } from "react";
import { toast } from "sonner";
import { TResponse } from "../../types/global";
import { TUser } from "../../types";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomSelectWithWatch from "../../components/form/CustomSelectWithWatch";
const UserManagement = () => {
  const { data: userData, isLoading: isUserLoading } = useGetAllUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [userRole, setUserRole] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<TUser>();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "_id",
    },
    {
      title: "Action",
      key: "changeRole",
      render: (item: TUser) => (
        <Button
          className="cursor-pointer"
          color="green"
          onClick={() => {
            setIsModalOpen(true);
            setUser(item);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handleUserRole: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating user role...");
    try {
      const res = (await updateUserRole({ id: user?._id, data: data })) as TResponse<TUser>;
      if (!res.error) {
        toast.success("User role updated successfully!", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error(res.error.data?.message || "Something went wrong");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };
  return (
    <div className="space-y-4">
      <h1 className="text-xl lg:text-2xl font-bold ">Users Management</h1>
      <Table
        scroll={{ x: 400 }}
        columns={columns as any}
        dataSource={userData}
        rowKey="_id"
        loading={isUserLoading}
      />
      <GenericItemModal
        title="Change Role"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <CustomForm onSubmit={handleUserRole}>
          <Form.Item
            label="User Role"
            name="role"
          >
            <CustomSelectWithWatch
              onValueChange={setUserRole}
              name="role"
            >
              <Select.Option value="manager">Manager</Select.Option>
              <Select.Option value="seller">Seller</Select.Option>
            </CustomSelectWithWatch>
          </Form.Item>
          {userRole === "manager" && (
            <Form.Item
              label="Branch"
              name="branch"
            >
              <CustomSelect
                name="branch"
                required={true}
              >
                {branches?.map((item, index) => (
                  <Select.Option
                    key={index}
                    value={item}
                  >
                    {item}
                  </Select.Option>
                ))}
              </CustomSelect>
            </Form.Item>
          )}
          <Row justify="end">
            <Button
              className="mr-2"
              type="dashed"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              type="dashed"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </Row>
        </CustomForm>
      </GenericItemModal>
    </div>
  );
};

export default UserManagement;
