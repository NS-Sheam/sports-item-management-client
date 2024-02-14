import { Select } from "antd";
import { ReactNode, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TCustomSelectProps = {
  name: string;
  initialValue?: string;
  required?: boolean;
  children: ReactNode;
};
const CustomSelect = ({ name, children, initialValue, required }: TCustomSelectProps) => {
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, initialValue);
  }, [initialValue, name, setValue]);
  return (
    <Controller
      name={name}
      rules={{
        required: required ? "This field is required" : false,
      }}
      defaultValue={initialValue}
      render={({ field, fieldState }) => (
        <>
          <Select {...field}>{children}</Select>
          {required && fieldState?.error && <span style={{ color: "red" }}>{fieldState?.error.message}</span>}
        </>
      )}
    />
  );
};

export default CustomSelect;
