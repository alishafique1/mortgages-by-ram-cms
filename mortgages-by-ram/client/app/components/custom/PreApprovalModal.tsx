import { useState, useEffect } from "react";
import { ContactForm } from "../blocks/ContactForm";

interface PreApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreApprovalModal({ isOpen, onClose }: PreApprovalModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-20 w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contact Form */}
        <div className="p-6">
          <ContactForm
            id={999}
            __component="blocks.contact-form"
            heading="Get Pre-Approved Today"
            subheading="Take the first step towards your dream home. Get pre-approved in minutes with our quick and easy process."
            buttonText="Get Pre-Approved Now"
            showPhone={true}
            showMessage={true}
          />
        </div>
      </div>
    </div>
  );
}


