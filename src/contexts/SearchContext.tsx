import React, { createContext, useState, useContext, ReactNode } from "react";

interface SearchFilters {
  distance: number | null;
  isGraduated: boolean;
  rating: number;
}

interface SearchContextType {
  searchText: string;
  setSearchText: (text: string) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  resetFilters: () => void;
}

const defaultFilters: SearchFilters = {
  distance: null,
  isGraduated: false,
  rating: 0,
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchText("");
  };

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
        filters,
        setFilters,
        resetFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
