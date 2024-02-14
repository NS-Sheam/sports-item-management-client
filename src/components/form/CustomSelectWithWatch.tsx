import { Select } from "antd";
import { ReactNode, useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
type TPHSelectProps = {
  name: string;
  children: ReactNode;
  disabled?: boolean;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};
const CustomSelectWithWatch = ({ name, children, disabled, onValueChange }: TPHSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue, onValueChange]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            style={{ width: "100%" }}
            {...field}
            size="large"
            disabled={disabled}
          >
            {children}
          </Select>
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </>
      )}
    />
  );
};

export default CustomSelectWithWatch;
