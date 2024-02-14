import { Upload } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
type TCustomImagePickerProps = {
  name: string;
  initialValue?: string | undefined;
};
const CustomImagePicker = ({ name, initialValue }: TCustomImagePickerProps) => {
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, initialValue);
  }, [initialValue, name, setValue]);
  return (
    <Controller
      name={name}
      defaultValue={initialValue}
      render={({ field }) => (
        <Upload.Dragger
          {...field}
          fileList={field?.value?.fileList}
          name="files"
        >
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Upload.Dragger>
      )}
    />
  );
};

export default CustomImagePicker;
