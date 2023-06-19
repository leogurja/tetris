import { I18n } from "../i18n/I18n";

export function Nav() {
  return (
    <nav className="text-white flex items-center border-b-neutral-700 border-b p-3 mb-5">
      <h1 className="text-lg font-bold">Tetris</h1>

      <div className="ml-auto">
        <I18n />
      </div>
    </nav>
  );
}
