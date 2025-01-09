import { cn } from "../components/utils/cn";
import { type Locale, locale, setLocale } from "./locale";

interface FlagProps {
  image: string;
  name: Locale;
}

export function Flag({ image, name }: FlagProps) {
  return (
    <img
      alt="flag"
      src={image}
      class={cn("w-7 aspect-square cursor-pointer", {
        "grayscale-0": name === locale(),
        "grayscale hover:grayscale-[50%]": name !== locale(),
      })}
      onClick={() => setLocale(name)}
      onKeyDown={() => {}}
    />
  );
}
