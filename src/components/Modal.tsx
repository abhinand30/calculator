import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
interface ModalSectionProps {
  children: ReactNode;
}
const Modal: React.FC<ModalProps> & {
  Header: React.FC<ModalSectionProps>;
  Content: React.FC<ModalSectionProps>;
  Action: React.FC<{ onClose: () => void; children?: ReactNode }>
} = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render when closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">


        {children}
      </div>
    </div>
  );
};




const ModalHeader: React.FC<ModalSectionProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}
const ModalContent: React.FC<ModalSectionProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}
const ModalAction: React.FC<{ onClose: () => void; children?: ReactNode }> = ({ onClose, children }) => {
  return (
    <div>
      {children}
      <button
        onClick={onClose}
        className=" text-gray-600 hover:text-black text-xl font-bold"
      >
        &times;
      </button>
    </div>
  )
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Action = ModalAction;

export default Modal