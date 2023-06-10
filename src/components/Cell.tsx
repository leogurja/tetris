interface Props {
  color?: string;
}

export function Cell({ color }: Props) {
  return (
    <>
      {color == null ? (
        <div className="h-8 w-8" />
      ) : (
        <div className={`h-8 w-8 ${color}`} />
      )}
    </>
  );
}
