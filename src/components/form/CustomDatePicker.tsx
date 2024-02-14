import { DatePicker } from "antd";
import { Controller } from "react-hook-form";
type TInputProps = {
  name: string;
};
const CustomDatePicker = ({ name }: TInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <DatePicker {...field} />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </>
      )}
    />
  );
};

export default CustomDatePicker;
