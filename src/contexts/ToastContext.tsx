import React, { createContext, useContext, useRef, useState } from "react";
import { Toast, ToastType } from "@/src/components/toast/Toast";

type ToastContextType = {
  show: (message: string, type: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const globalToast = {
  show: (message: string, type: ToastType = "info") => {
    console.warn("ToastProvider not initialized");
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (message: string, type: ToastType = "info") => {
    setToast({ message, type });

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };
  globalToast.show = show;
  const close = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={close} />
      )}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToastContext must be used inside ToastProvider");
  }
  return ctx;
};
