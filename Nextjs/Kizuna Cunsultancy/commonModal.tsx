"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface AlertConfig {
  type: "Confirmation" | "Success" | "Error";
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  messageTitle: string;
  message: string;
  imageUrl?: string;
}

interface AlertModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  forAlert: AlertConfig;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  forAlert,
  size = "md",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = isOpen !== undefined;
  const open = isControlled ? isOpen : internalIsOpen;

  const handleClose = () => {
    if (!isControlled) setInternalIsOpen(false);
    onClose?.();
  };

  useEffect(() => {
    if (!isControlled && isOpen !== undefined) {
      setInternalIsOpen(!!isOpen);
    }
  }, [isOpen, isControlled]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-xl p-6 text-center`}
            >
              {/* Image */}
              {forAlert.imageUrl && (
                <img
                  src={forAlert.imageUrl}
                  alt={forAlert.messageTitle}
                  className="mx-auto mb-4 h-20 w-20 object-contain"
                />
              )}

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900">
                {forAlert.messageTitle}
              </h3>

              {/* Message */}
              <p className="mt-2 text-sm text-gray-600">{forAlert.message}</p>

              {/* Buttons */}
              <div className="mt-6 flex justify-center gap-3">
                {forAlert.type === "Confirmation" && (
                  <>
                    <button
                      onClick={forAlert.onConfirm}
                      className="px-5 py-2 text-sm font-medium text-white bg-[#D4A574] rounded-md hover:bg-[#c49563] transition"
                    >
                      {forAlert.confirmText || "Yes"}
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
                    >
                      {forAlert.cancelText || "No"}
                    </button>
                  </>
                )}

                {(forAlert.type === "Success" || forAlert.type === "Error") && (
                  <button
                    onClick={handleClose}
                    className={`px-6 py-2 text-sm font-medium text-white rounded-md transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                      forAlert.type === "Success"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    OK
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
