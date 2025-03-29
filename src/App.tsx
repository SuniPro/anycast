import "./App.css";
import { Header } from "./components/Menu/Header";
import { WindowContextProvider } from "./Context/WindowContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./page/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchContextProvider } from "./Context/SearchContext";
import { Auditorium } from "./page/Auditorium";
import { Toaster } from "react-hot-toast";
import styled from "@emotion/styled";
import { slideUp } from "./components/styled/Animation/Animation";

const QUERY_CLIENT = new QueryClient();

function App() {
  // const [check, setCheck] = useState(() => hasIntroCookie());
  //
  // const handleIntroCheck = () => {
  //   setIntroCookie();
  //   setCheck(true);
  // };

  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <WindowContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="auditorium/:id?" element={<Auditorium />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </SearchContextProvider>
      </WindowContextProvider>
    </QueryClientProvider>
  );
}

export const SlideInContent = styled.div`
  animation: ${slideUp} 0.6s ease-out forwards;
`;

export default App;
