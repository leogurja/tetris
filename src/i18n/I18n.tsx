import { Flag } from "./Flag";
import BrazilFlag from "./flags/brazil.svg";
import UsaFlag from "./flags/usa.svg";

export function I18n() {
  return (
    <div class="flex gap-3">
      <Flag image={BrazilFlag} name="pt" />
      <Flag image={UsaFlag} name="en" />
    </div>
  );
}
