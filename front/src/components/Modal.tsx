import React, { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-30"></div>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-y-visible rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </Dialog.Title>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                X
              </button>
            </div>

            {/* Modal Body */}
            <div>{children}</div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;