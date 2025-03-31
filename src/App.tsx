import "./App.css";
import { Header } from "./components/Menu/Header";
import { WindowContextProvider } from "./Context/WindowContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./page/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchContextProvider } from "./Context/SearchContext";
import { Auditorium } from "./page/Auditorium";
import { Toaster } from "react-hot-toast";
import { Cursor } from "./utils/cursor/Cursor";
import { CursorProvider } from "./Context/CursorContext";

const QUERY_CLIENT = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <WindowContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <CursorProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="auditorium/:id?" element={<Auditorium />} />
              </Routes>
              <Cursor />
            </CursorProvider>
          </BrowserRouter>
          <Toaster />
        </SearchContextProvider>
      </WindowContextProvider>
    </QueryClientProvider>
  );
}

export default App;
