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
import { useDarkMode } from "usehooks-ts";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, defaultTheme } from "./styles/theme";
import { Footer, GlobalStyled } from "./components/layouts/Layouts";
import { useEffect, useState } from "react";

const QUERY_CLIENT = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <QueryClientProvider client={QUERY_CLIENT}>
        <WindowContextProvider>
          <SearchContextProvider>
            <BrowserRouter>
              <CursorProvider>
                <Header darkState={{ darkMode, setDarkMode }} />
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="auditorium/:id?" element={<Auditorium />} />
                </Routes>
                <Cursor />
              </CursorProvider>
            </BrowserRouter>
            <Toaster />
            <GlobalStyled />
            <Footer />
          </SearchContextProvider>
        </WindowContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
