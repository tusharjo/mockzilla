import React from "react";
import { Header } from "./components/common/header";
import { Footer } from "./components/common/footer";
import Route from "./route";

export default function Main() {
  return (
    <div className="main">
      <Header />
      <Route />
      <Footer />
    </div>
  );
}
