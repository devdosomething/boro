import React from "react";
import "./GlobalStyles.css";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <React.Fragment>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Body />
        <Footer />
      </div>
      <div id="portal" />
    </React.Fragment>
  );
};

export default App;
