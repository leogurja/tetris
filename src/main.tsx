import React from "react";
import { createRoot } from "react-dom/client";
import { Game } from "./components/Game";
import { Nav } from "./components/Nav";
import "./i18n";
import { Providers } from "./providers";
import "./styles/index.css";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <div className="h-screen flex flex-col text-white">
      <Providers>
        <Nav />
        <Game />
      </Providers>
    </div>
  </React.StrictMode>,
);
