import Cell from "./Cell";

interface Props {
  board: string[][] | null;
}

export default function Board({ board }: Props) {
  return (
    <div className="m-auto w-fit select-none border border-neutral-700 shadow-neutral-950 shadow-md bg-neutral-900">
      {board != null ? (
        board.map((row, rowIndex) => (
          <div className="flex" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <Cell color={cell} key={cellIndex} />
            ))}
          </div>
        ))
      ) : (
        <div className="flex w-80 h-[40rem]" />
      )}
    </div>
  );
}
