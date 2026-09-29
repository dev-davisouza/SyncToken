// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SocketProvider } from "./context/SocketContext/index.tsx";
import { FetchProvider } from "./context/FetchContext/provider.tsx";
import { FormProvider } from "./context/FormContext/index.tsx";
import { PaginatorProvider } from "./context/PaginatorContext/index.tsx";
import { ModalTriggerProvider } from "./context/ModalTriggerContext/index.tsx";
import { PeopleSelectorProvider } from "./context/PeopleSelectorContext/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketProvider>
      <ModalTriggerProvider>
        <PaginatorProvider>
          <FetchProvider>
            <PeopleSelectorProvider>
              <FormProvider>
                <App />
              </FormProvider>
            </PeopleSelectorProvider>
          </FetchProvider>
        </PaginatorProvider>
      </ModalTriggerProvider>
    </SocketProvider>
  </React.StrictMode>
);
