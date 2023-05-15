import { useState } from "react";

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

export default function App() {
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [board, setBoard] = useState<Map<number, "X" | "O">>(() => new Map());
  const [result, setResult] = useState<string>();

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
    <main className="grid grid-cols-3 gap-1 bg-slate-900 p-2 rounded">
      {GRID.map((i) => {
        const currentCell = board.get(i);
        return (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`bg-slate-700 w-16 h-16 rounded-sm font-bold text-5xl ${
              currentCell === "X" ? "text-yellow-500" : "text-blue-500"
            }`}
          >
            {currentCell || " "}
          </button>
        );
      })}
      {result && (
        <div className="text-red-500 text-lg absolute">
          {result} takes the round
        </div>
      )}
    </main>
  );
}
