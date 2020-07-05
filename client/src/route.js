import React from "react";
import { Home } from "./components/home";
import { Edit } from "./components/edit";
import { ManageCalls } from "./components/manage-calls";
import { NotFound } from "./components/not-found";
import { Router } from "@reach/router";
import { Box } from "@chakra-ui/core";

export default function Route() {
  return (
    <Box minH={`calc(100vh - 144px)`}>
      <Router>
        <Home path="/" />
        <ManageCalls path="/manage" />
        <Edit path="/edit/:appid" />
        <NotFound path="*" />
      </Router>
    </Box>
  );
}
