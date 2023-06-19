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
      <h2 className="font-bold text-md">{t(name)}</h2>
      <p className="text-lg md:text-xl lg:text-4xl">{children}</p>
    </div>
  );
}
