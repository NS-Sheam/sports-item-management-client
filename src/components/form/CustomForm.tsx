import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  className?: string;
};
const CustomForm = ({ onSubmit, children, className }: TFormProps) => {
  const methods = useForm();
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form
        className={className}
        onFinish={methods.handleSubmit(submit)}
        layout="vertical"
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default CustomForm;
