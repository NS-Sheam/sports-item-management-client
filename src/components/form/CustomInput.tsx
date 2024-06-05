import { Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
type TInputProps = {
  type: string;
  name: string;
  required?: boolean;
  initialValue?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
};
const CustomInput = ({ type, name, required, initialValue, readOnly, disabled, className }: TInputProps) => {
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, initialValue);
  }, [initialValue, name, setValue]);
  return (
    <Controller
      name={name}
      defaultValue={initialValue}
      disabled={disabled}
      render={({ field }) => (
        <Input
          className={`w-full px-2 ${className}`}
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
