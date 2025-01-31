import { Modal } from "antd";
import { ReactNode } from "react";

type TGenericItemModalProps = {
  title: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  width?: number;
  children: ReactNode;
};

const GenericItemModal = ({ title, isModalOpen, setIsModalOpen, width, children }: TGenericItemModalProps) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      width={width}
      title={title}
      open={isModalOpen}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default GenericItemModal;
