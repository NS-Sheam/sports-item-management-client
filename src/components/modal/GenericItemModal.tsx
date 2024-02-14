import { Modal } from "antd";
import { ReactNode } from "react";

type TGenericItemModalProps = {
  title: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const GenericItemModal = ({ title, isModalOpen, setIsModalOpen, children }: TGenericItemModalProps) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
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
