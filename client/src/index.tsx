import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { StorageProvider } from "./components/common/localStorageContext";
import Main from "./main";
import * as serviceWorker from './serviceWorker';
import customTheme from "./themes/themes";

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
serviceWorker.register();
