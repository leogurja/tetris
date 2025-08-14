import React from "react";
import { createRoot } from "react-dom/client";
import { Game } from "./components/Game";
import { Nav } from "./components/Nav";
import "./i18n";
import "./styles/index.css";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <div className="h-screen flex flex-col text-white">
      <Nav />
      <Game />
    </div>
  </React.StrictMode>,
);
