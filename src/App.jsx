import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Sidebar from "./components/Header";
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
  flex-direction: column;
`;

const MainContainer = styled.main`
  display: flex;
  flex: 1;
  gap: 24px;
  width: 100%;
  margin: auto;
  min-height: 100vh;
  align-items: flex-start;
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
            <Route
              path={`${Links.CRIAR_FICHA}/:id//*`}
              element={<ServiceBook />}
            />
          </Routes>
        </MainContainer>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
