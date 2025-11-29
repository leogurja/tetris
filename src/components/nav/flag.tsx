import Image from "next/image";

interface FlagProps {
  image: string;
  isSelected: boolean;
}

export function Flag({ image, isSelected }: FlagProps) {
  return (
    <Image
      alt="flag"
      className={`aspect-square w-7 cursor-pointer ${
        isSelected ? "grayscale-0" : "grayscale hover:grayscale-50"
      }`}
      src={image}
    />
  );
}
