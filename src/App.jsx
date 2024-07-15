import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Sidebar from "./components/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Links } from "./context/Links";
import ServiceBook from "./pages/ServiceBook";
import Queue from "./pages/Queue";
import Reports from "./pages/Reports";
import People from "./pages/People";
import ReportDetail from "./pages/ReportDetail";
import Auth from "./pages/Auth";
import AuthContext, { AuthProvider } from "./context/Auth";
import { useContext, useEffect } from "react";

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
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
  });

  return (
    <AppContainer>
      <GlobalStyles />
      {user ? (
        <>
          <Sidebar />
          <MainContainer>
            <Routes>
              <Route path={Links.HOME} element={<Queue />} />
              <Route path={Links.CRIAR_FICHA} element={<ServiceBook />} />
              <Route
                path={`${Links.CRIAR_FICHA}/:id/*`}
                element={<ServiceBook />}
              />
              <Route path={Links.RELATORIOS} element={<Reports />} />
              <Route
                path={`${Links.RELATORIOS}/:id/*`}
                element={<ReportDetail />}
              />
              <Route path={Links.ALL_PESSOAS} element={<People />} />
            </Routes>
          </MainContainer>
        </>
      ) : (
        <Routes>
          <Route path={Links.AUTH} element={<Auth />} />
        </Routes>
      )}
    </AppContainer>
  );
}

export default () => (
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
