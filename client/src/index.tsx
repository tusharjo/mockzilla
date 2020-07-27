import React from "react";
import ReactDOM from "react-dom";
import Main from "./main";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import customTheme from "./themes/themes";
import "./core.css";
import { StorageProvider } from "./components/common/localStorageContext";

ReactDOM.render(
  <React.StrictMode>
    <StorageProvider>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <ColorModeProvider>
          <Main />
        </ColorModeProvider>
      </ThemeProvider>
    </StorageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
