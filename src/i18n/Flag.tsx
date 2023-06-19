interface FlagProps {
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

export function Flag({ image, isSelected, onClick }: FlagProps) {
  return (
    <img
      alt="flag"
      src={image}
      className={`w-8 aspect-square cursor-pointer m-2 ${
        isSelected ? "grayscale-0" : "grayscale hover:grayscale-[50%]"
      }`}
      onClick={onClick}
    />
  );
}
