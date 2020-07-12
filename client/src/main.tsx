import React from "react";
import { Header } from "./components/common/header";
import { Footer } from "./components/common/footer";
import Route from "./route";
import { Box } from "@chakra-ui/core";

export default function Main() {
  return (
    <Box>
      <Header />
      <Route />
      <Footer />
    </Box>
  );
}
