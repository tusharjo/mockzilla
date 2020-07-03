import React from "react";
import { Header } from "./components/common/header";
import { Footer } from "./components/common/footer";
import Route from "./route";
import "bootstrap/dist/css/bootstrap.min.css";
import "./core.scss";

export default function Main() {
  return (
    <div>
      <Header />
      <Route />
      <Footer />
    </div>
  );
}
