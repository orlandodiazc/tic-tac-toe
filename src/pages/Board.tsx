import { useState } from "react";
import WinnerModal from "../components/WinnerModal";

const GRID = Array.from(Array(9).keys());
const WINNER_COMB = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Board() {
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [board, setBoard] = useState<Map<number, "X" | "O">>(() => new Map());
  const [result, setResult] = useState<"X" | "O">();

  function handleClick(cell: number) {
    if (board.has(cell)) return;

    const draft = new Map(board).set(cell, player);
    setBoard(draft);
    setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    const winner = WINNER_COMB.find((comb) =>
      comb.every((cell) => draft.get(cell) === player)
    );
    if (winner) setResult(player);
  }
  return (
    <main className="bg-slate-900 h-full flex items-center">
      <section className="grid grid-cols-3 gap-2 bg-slate-900 p-2 rounded m-auto">
        {GRID.map((i) => {
          const currentCell = board.get(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`bg-slate-800 w-16 h-16 rounded shadow-down shadow-slate-950 font-bold text-5xl pb-1 ${
                currentCell === "X" ? "text-yellow-500" : "text-blue-500"
              }`}
            >
              {(currentCell || " ").toUpperCase()}
            </button>
          );
        })}
        {result && <WinnerModal winner={result} />}
      </section>
    </main>
  );
}
