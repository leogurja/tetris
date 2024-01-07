interface FlagProps {
	image: string;
	isSelected: boolean;
	onClick: () => void;
}

export default function Flag({ image, isSelected, onClick }: FlagProps) {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Keys must be captured for movement
		<img
			alt="flag"
			src={image}
			className={`w-7 aspect-square cursor-pointer ${
				isSelected ? "grayscale-0" : "grayscale hover:grayscale-[50%]"
			}`}
			onClick={onClick}
		/>
	);
}
