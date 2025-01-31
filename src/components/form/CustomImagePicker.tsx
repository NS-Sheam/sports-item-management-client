import { Upload, message } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InboxOutlined } from "@ant-design/icons";

type TCustomImagePickerProps = {
  name: string;
  initialValue?: string | undefined;
};

const CustomImagePicker = ({ name, initialValue }: TCustomImagePickerProps) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    if (initialValue) {
      setValue(name, [
        {
          uid: "-1",
          name: "Existing Image",
          status: "done",
          url: initialValue, // Show existing image
        },
      ]);
    }
  }, [initialValue, name, setValue]);

  const handleChange = ({ fileList }: any) => {
    setValue(name, fileList);
  };

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Upload.Dragger
          {...field}
          fileList={field.value || []}
          onChange={handleChange}
          listType="picture-card"
          multiple={false}
          maxCount={1}
          accept="image/*"
          beforeUpload={(file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
              message.error("You can only upload image files!");
              return Upload.LIST_IGNORE;
            }
            return true;
          }}
        >
          {field.value?.length ? null : (
            <div className="flex flex-col items-center justify-center">
              <InboxOutlined className="text-5xl text-gray-400 mb-2" />
              <p className="text-gray-500">Click or drag file to upload</p>
            </div>
          )}
        </Upload.Dragger>
      )}
    />
  );
};

export default CustomImagePicker;
