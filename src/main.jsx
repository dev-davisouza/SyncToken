import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "@/context/AuthContext.jsx";
import { FichaProvider } from "@/context/FichaContext";
import { FormProvider } from "@/context/FormContext.jsx";
import { RelatorioProvider } from "@/context/RelatorioContext.jsx";
import { PaginatorProvider } from "@/context/PaginatorContext.jsx";
import { MessageProvider } from "@/context/MessageContext.jsx";
import { TriggerProvider } from "./context/TriggerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TriggerProvider>
        <PaginatorProvider>
          <MessageProvider>
            <FichaProvider>
              <RelatorioProvider>
                <FormProvider>
                  <App />
                </FormProvider>
              </RelatorioProvider>
            </FichaProvider>
          </MessageProvider>
        </PaginatorProvider>
      </TriggerProvider>
    </AuthProvider>
  </React.StrictMode>
);
