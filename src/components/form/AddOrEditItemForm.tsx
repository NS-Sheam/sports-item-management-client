import { Button, Col, Form, Row, Select } from "antd";
import CustomForm from "./CustomForm";
import CustomInput from "./CustomInput";
import {
  ProductColors,
  ProductConditions,
  ProductMaterials,
  ProductSizes,
  ProductStyles,
  ProductTypes,
} from "../../utils/item.const";
import CustomSelect from "./CustomSelect";
import CustomImagePicker from "./CustomImagePicker";
import { useCreateProductMutation, useUpdateProductMutation } from "../../redux/features/product/productApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TProduct } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { TResponse } from "../../types/global";

type TAddOrEditItemFormProps = {
  defaultValues: TProduct & { key?: string };
  modalType: "add" | "edit";
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const img_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;

const AddOrEditItemForm = ({ defaultValues, modalType, setIsModalOpen }: TAddOrEditItemFormProps) => {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const branch = useAppSelector((state) => state.auth.user?.branch);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading...");
    const formData = new FormData();

    formData.append("image", data?.image?.file?.originFileObj);

    try {
      let res;
      if (modalType === "add") {
        const imageRes = await fetch(img_hosting_url, {
          method: "POST",
          body: formData,
        });
        const imageData = await imageRes.json();
        const imageUrl = imageData?.data?.display_url;
        data.image = imageUrl;
        res = (await createProduct(data)) as TResponse<TProduct>;
      } else {
        res = (await updateProduct({ id: defaultValues?._id, updatedProduct: data })) as TResponse<TProduct>;
      }
      if (!res.error) {
        toast.success("User role updated successfully!", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error(res.error.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setIsModalOpen(false);
  };
  return (
    <CustomForm onSubmit={onSubmit}>
      <Row gutter={[2, 2]}>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Name"
            name="name"
          >
            <CustomInput
              initialValue={defaultValues?.name}
              type="text"
              name="name"
              required={true}
            />
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Brand"
            name="brand"
          >
            <CustomInput
              initialValue={defaultValues?.brand}
              type="text"
              name="brand"
              required={true}
            />
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Branch"
            name="branch"
          >
            <CustomInput
              type="text"
              name="branch"
              initialValue={branch}
              readOnly={true}
              required={true}
            />
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Type"
            name="type"
          >
            <CustomSelect
              initialValue={defaultValues?.type}
              name="type"
              required={true}
            >
              {ProductTypes?.map((item, index) => (
                <Select.Option
                  key={index}
                  value={item}
                >
                  {item}
                </Select.Option>
              ))}
            </CustomSelect>
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Material"
            name="material"
          >
            <CustomSelect
              initialValue={defaultValues?.material}
              required={true}
              name="material"
            >
              {ProductMaterials?.map((item, index) => (
                <Select.Option
                  key={index}
                  value={item}
                >
                  {item}
                </Select.Option>
              ))}
            </CustomSelect>
          </Form.Item>
        </Col>

        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Color"
            name="color"
          >
            <CustomSelect
              initialValue={defaultValues?.color}
              required={true}
              name="color"
            >
              {ProductColors?.map((item, index) => (
                <Select.Option
                  key={index}
                  value={item}
                >
                  {item}
                </Select.Option>
              ))}
            </CustomSelect>
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Size"
            name="size"
          >
            <CustomSelect
              name="size"
              initialValue={defaultValues?.size}
              required={true}
            >
              {ProductSizes?.map((item, index) => (
                <Select.Option
                  key={index}
                  value={item}
                >
                  {item}
                </Select.Option>
              ))}
            </CustomSelect>
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Condition"
            name="condition"
          >
            <CustomSelect
              initialValue={defaultValues?.condition}
              required={true}
              name="condition"
            >
              {ProductConditions?.map((item, index) => (
                <Select.Option
                  key={index}
                  value={item}
                >
                  {item}
                </Select.Option>
              ))}
            </CustomSelect>
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Price"
            name="price"
          >
            <CustomInput
              type="number"
              name="price"
              required={true}
              initialValue={defaultValues?.price}
            />
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Quantity"
            name="quantity"
          >
            <CustomInput
              type="number"
              name="quantity"
              required={true}
              initialValue={defaultValues?.quantity}
            />
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Weight(kg)"
            name="weight"
          >
            <CustomInput
              type="number"
              name="weight"
              required={true}
              initialValue={defaultValues?.weight}
            />
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={8}
        >
          <Form.Item
            label="Style"
            name="style"
          >
            <CustomSelect
              name="style"
              initialValue={defaultValues?.style}
              required={true}
            >
              {ProductStyles?.map((item, index) => (
                <Select.Option
                  key={index}
                  value={item}
                >
                  {item}
                </Select.Option>
              ))}
            </CustomSelect>
          </Form.Item>
        </Col>
        {modalType === "add" && (
          <Col span={12}>
            <Form.Item label="Image">
              <Form.Item
                name="image"
                valuePropName="fileList"
                // getValueFromEvent={normFile}
                noStyle
              >
                <CustomImagePicker
                  initialValue={defaultValues?.image}
                  name="image"
                />
              </Form.Item>
            </Form.Item>
          </Col>
        )}
        <Col
          span={8}
          offset={16}
          className="flex justify-end"
        >
          <Button
            className="mr-2"
            htmlType="submit"
            style={{
              background: "#93278f",
              color: "#fff",
              width: "5rem",
            }}
          >
            Submit
          </Button>
          <Button
            type="default"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </CustomForm>
  );
};

export default AddOrEditItemForm;
