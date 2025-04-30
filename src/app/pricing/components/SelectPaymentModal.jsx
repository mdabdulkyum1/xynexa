"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const SelectPaymentModal = ({ isOpen, closeModal, onSelectPayment }) => {
  const handleSelect = (method) => {
    onSelectPayment(method);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
                <Dialog.Title className="text-lg font-bold text-gray-900 mb-4">
                  Select Payment Method
                </Dialog.Title>
                <div className="space-y-4">
                  <button
                    onClick={() => handleSelect("Stripe")}
                    className="w-full border rounded-lg py-2 bg-[#E0F7FA] hover:bg-[#B2EBF2] font-semibold text-[#014E4E] cursor-pointer"
                  >
                    Pay with Stripe
                  </button>
                  <button
                    onClick={() => handleSelect("SSL")}
                    className="w-full border rounded-lg py-2 bg-[#E0F7FA] hover:bg-[#B2EBF2] font-semibold text-[#014E4E] cursor-pointer"
                  >
                    Pay with SSL
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SelectPaymentModal;
