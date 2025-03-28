import "./App.css";
import { Header } from "./components/Menu/Header";
import { WindowContextProvider } from "./Context/WindowContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./page/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchContextProvider } from "./Context/SearchContext";

const QUERY_CLIENT = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <WindowContextProvider>
        <SearchContextProvider>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />}></Route>
            </Routes>
          </BrowserRouter>
        </SearchContextProvider>
      </WindowContextProvider>
    </QueryClientProvider>
  );
}

export default App;
