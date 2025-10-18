import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface PreApprovalModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const PreApprovalModalContext = createContext<PreApprovalModalContextType | undefined>(undefined);

export function PreApprovalModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <PreApprovalModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </PreApprovalModalContext.Provider>
  );
}

export function usePreApprovalModal() {
  const context = useContext(PreApprovalModalContext);
  if (context === undefined) {
    throw new Error("usePreApprovalModal must be used within a PreApprovalModalProvider");
  }
  return context;
}


