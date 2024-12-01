"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { store, persistor } from "../store/store";
import { Provider } from "react-redux";
import theme from "../theme/theme";
import PrivateRoute from "./privateRoute";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <PrivateRoute>{children}</PrivateRoute>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
