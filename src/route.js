import React from "react";
import { Home } from "./components/home";
import { Edit } from "./components/edit";
import { Router } from "@reach/router";

export default function Route() {
  return (
    <Router>
      <Home path="/" />
      <Edit path="/edit/:appid" />
    </Router>
  );
}
