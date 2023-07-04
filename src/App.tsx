import { Game } from "./components/Game";
import { Nav } from "./components/Nav";

import "./i18n";

export function App() {
  return (
    <div className="h-screen flex flex-col">
      <Nav />
      <Game />
    </div>
  );
}
