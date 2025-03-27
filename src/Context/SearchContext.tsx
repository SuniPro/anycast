import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const SearchContext = createContext<{
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
} | null>(null);

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useWindowContext must be used within a WindowContextProvider",
    );
  }
  return context;
}
