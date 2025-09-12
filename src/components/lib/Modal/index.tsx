import React, { ReactNode } from "react";
import { X } from "lucide-react";
import { ModalProps } from "./types";

export function Modal({ isOpen, onClose, title, children, subtitle, disableOverlayClick }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={!disableOverlayClick ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl p-6 animate-fadeIn mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            {title && <h2 className="text-lg font-semibold text-[#06152B]">{title}</h2>}
            {subtitle && <p className="text-sm text-[#99B2C6]">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="text-[#06152B]">{children}</div>
      </div>
    </div>
  );
}
