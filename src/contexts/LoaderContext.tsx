import { createContext, ReactNode, useContext, useState } from "react";
import { Loader } from "../components/loader/Loader";

type LoaderContextType = {
  showLoader: () => void;
  hideLoader: () => void;
  isLoading: boolean;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <LoaderContext.Provider
      value={{
        showLoader: () => setVisible(true),
        hideLoader: () => setVisible(false),
        isLoading: visible,
      }}
    >
      {children}
      <Loader visible={visible} />
    </LoaderContext.Provider>
  );
};

export const useLoaderContext = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error("useLoader must be used within LoaderProvider");
  return ctx;
};
