import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Links } from "./context/Links";
import ServiceBook from "./pages/ServiceBook";
import Queue from "./pages/Queue";

const AppContainer = styled.div`
  background-color: #fafafa;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  display: flex;
  height: auto;
`;

const MainContainer = styled.main`
  display: flex;
  flex: 1;
  gap: 24px;
  width: 100%;
  margin: 0 auto 0 12px;
  min-height: 100vh;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <GlobalStyles />
        <Sidebar />
        <MainContainer>
          <Routes>
            <Route path={Links.HOME} element={<Queue />} />
            <Route path={Links.CRIAR_FICHA} element={<ServiceBook />} />
          </Routes>
        </MainContainer>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
