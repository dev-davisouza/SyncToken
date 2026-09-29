/* eslint-disable react-refresh/only-export-components */
import GlobalStyles from "@/components/GlobalStyles";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Links } from "./context/Links";
import styled from "styled-components";
import Queue from "./pages/Queue";
import Header from "./components/Header";
import ServiceBook from "./pages/ServiceBook";
import Benefits from "./pages/Benefits";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/Reports/ReportDetail";
import People from "./pages/People";
import { useEffect } from "react";
import useFormContext from "./hooks/useFormContext";

function App() {
  const location = useLocation();
  const { setFormData } = useFormContext();
  useEffect(() => {
    setFormData({});
  }, [location, setFormData]);
  return (
    <AppContainer>
      <GlobalStyles />
      <Header />
      <MainContainer>
        <Routes>
          <Route path={Links.HOME} element={<Queue />} />
          <Route path={Links.CRIAR_FICHA} element={<ServiceBook />} />
          <Route
            path={`${Links.CRIAR_FICHA}/:id/*`}
            element={<ServiceBook />}
          />
          <Route path={Links.BENEFITS} element={<Benefits />} />
          <Route path={Links.RELATORIOS} element={<Reports />} />
          <Route
            path={`${Links.RELATORIOS}/:id/*`}
            element={<ReportDetail />}
          />
          <Route path={Links.ALL_PESSOAS} element={<People />} />
        </Routes>
      </MainContainer>
    </AppContainer>
  );
}

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

export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
