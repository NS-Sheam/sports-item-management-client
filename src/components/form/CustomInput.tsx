import { Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
type TInputProps = {
  type: string;
  name: string;
  required?: boolean;
  initialValue?: string | number;
  readOnly?: boolean;
};
const CustomInput = ({ type, name, required, initialValue, readOnly }: TInputProps) => {
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, initialValue);
  }, [initialValue, name, setValue]);
  return (
    <Controller
      name={name}
      defaultValue={initialValue}
      render={({ field }) => (
        <Input
          readOnly={readOnly}
          {...field}
          type={type}
          required={required}
        />
      )}
    />
  );
};

export default CustomInput;
