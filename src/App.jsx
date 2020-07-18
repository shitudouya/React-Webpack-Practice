import "./assets/styles/index.less";
import React from "react";

const logo = require("./assets/images/logo.png");

function App() {
  return (
    <>
      <img src={logo} alt="logo" />
      <p>Hello React!</p>
    </>
  );
}

export default App;
