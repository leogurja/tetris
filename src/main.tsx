import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./components/Game";
import Nav from "./components/nav";
import "./i18n";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <div className="h-screen flex flex-col">
      <Nav />
      <Game />
    </div>
  </React.StrictMode>
);
