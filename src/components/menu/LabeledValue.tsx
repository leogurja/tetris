import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface LabeledValueProps {
  name: string;
}

export function LabeledValue({
  children,
  name,
}: PropsWithChildren<LabeledValueProps>) {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="font-bold text-sm sm:text-lg">{t(name)}</h2>
      {children}
    </div>
  );
}
