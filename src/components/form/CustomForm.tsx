import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
};
const CustomForm = ({ onSubmit, children }: TFormProps) => {
  const methods = useForm();
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default CustomForm;
