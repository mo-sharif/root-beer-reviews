import React from 'react';
import { Transition } from '@headlessui/react';

interface AlertProps {
  message: string;
  show: boolean;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, show, type = 'success', onClose }) => {
  return (
    <Transition
      show={show}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 translate-y-4"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-4"
    >
      <div
        className={`fixed bottom-4 right-4 w-64 p-4 rounded-md shadow-md z-50 ${
          type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        <div className="flex justify-between items-center">
          <p>{message}</p>
          <button onClick={onClose} className="ml-4">
            ✕
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default Alert;