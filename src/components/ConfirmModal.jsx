import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, mensaje }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white p-6 rounded-xl max-w-sm w-full shadow-xl">
            <DialogTitle className="text-lg font-bold mb-2">Confirmar acción</DialogTitle>
            <DialogDescription className="mb-4">{mensaje}</DialogDescription>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
