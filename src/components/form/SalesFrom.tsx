import { Button, Form, Row } from "antd";
import CustomForm from "./CustomForm";
import CustomInput from "./CustomInput";
import { FieldValues } from "react-hook-form";
import { TProduct } from "../../types";
import CustomDatePicker from "./CustomDatePicker";

type TSalesFromProps = {
  handleSell: (data: FieldValues) => Promise<void>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: TProduct;
};
const SalesFrom = ({ product, handleSell, setIsModalOpen }: TSalesFromProps) => {
  return (
    <CustomForm onSubmit={handleSell}>
      <Form.Item
        label="Customer"
        name="name"
      >
        <CustomInput
          type="text"
          name="name"
          required={true}
        />
      </Form.Item>
      <Form.Item
        label="Branch"
        name="branch"
      >
        <CustomInput
          type="text"
          name="branch"
          initialValue={product.branch}
          readOnly={true}
          required={true}
        />
      </Form.Item>
      <Form.Item
        label="Quantity"
        name="quantity"
      >
        <CustomInput
          type="number"
          name="quantity"
          required={true}
        />
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
      >
        <CustomDatePicker name="date" />
      </Form.Item>

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
  );
};

export default SalesFrom;
