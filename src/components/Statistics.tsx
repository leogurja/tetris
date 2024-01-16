import { useTranslation } from "react-i18next";

interface StatisticsProps {
	level: number;
	score: number;
	record: number;
}

export default function Statistics({ level, score, record }: StatisticsProps) {
	const { t } = useTranslation();

	return (
		<header className="w-full rounded-2xl pb-2 grid grid-cols-3 place-items-stretch justify-between items-center">
			<h2 className="font-bold text-sm">
				{t("level")} {level + 1}
			</h2>
			<h2 className="font-bold text-lg text-center">{score}</h2>
			<h2 className="font-bold text-sm text-end">
				{t("record")} {record}
			</h2>
		</header>
	);
}
