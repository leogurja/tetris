/* @refresh reload */
import { render } from "solid-js/web";
import { Game } from "./components/Game";
import { Nav } from "./components/Nav";
import "./styles/index.css";

const root = document.getElementById("root");

if (root == null) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <div class="h-screen flex flex-col text-white">
      <Nav />
      <Game />
    </div>
  ),
  root,
);
