import { useEffect, useState } from "react";
import WinnerModal from "../components/WinnerModal";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { MdRefresh } from "react-icons/md";
import minimax, { isWinner } from "../utils/gameboard";
import { useLocation } from "react-router-dom";

const GRID = Array.from(Array(9).keys());

type Player = "X" | "O";
type Result =
  | { type: "tie" }
  | { type: "winner"; player: Player; winningComb: number[] };

type Stats = { ties: number; xWin: number; oWin: number };

export default function Board() {
  const { state } = useLocation();
  const { isVersusCPU, playerMark, cpuMark } = state;
  const [board, setBoard] = useState<Map<number, Player>>(() => new Map());
  const [result, setResult] = useState<Result>();
  const [stats, setStats] = useState<Stats>({ ties: 0, xWin: 0, oWin: 0 });
  const [player, setPlayer] = useState<Player>(playerMark || "X");

  useEffect(() => {
    if (isVersusCPU && playerMark !== "X") {
      const boardDraft = new Map(board).set(0, "X");
      setBoard(boardDraft);
    }
  }, []);

  function handleClick(cell: number) {
    if (board.has(cell)) return;
    let winningComb = undefined;

    const draft = new Map(board).set(cell, player);
    winningComb = isWinner(draft, player);

    if (isVersusCPU && !winningComb) {
      const aiMove = minimax(draft, 9 - draft.size, cpuMark);
      draft.set(aiMove.move, cpuMark);
      winningComb = isWinner(draft, cpuMark);
    } else {
      setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    }

    setBoard(draft);

    if (winningComb) {
      setResult({ type: "winner", player, winningComb });
      if (player === "X") {
        setStats({ ...stats, xWin: stats.xWin + 1 });
      } else {
        setStats({ ...stats, oWin: stats.oWin + 1 });
      }
    } else if (draft.size === 9) {
      setResult({ type: "tie" });
      setStats({ ...stats, ties: stats.ties + 1 });
    }
  }

  function clearBoard() {
    setResult(undefined);
    setTimeout(() => setBoard(new Map()), 100);
    setPlayer("X");
  }
  return (
    <main className="bg-slate-900 h-full flex items-center">
      {player}
      <section className="grid grid-cols-3 gap-4 bg-slate-900 p-2 rounded m-auto">
        <div className="flex items-center gap-0.5">
          <Logo className="font-extrabold text-lg" />
        </div>
        <div className="flex items-center justify-center gap-1 bg-slate-800 rounded text-xs text-slate-300/90 shadow-down shadow-slate-950 ">
          <span className="font-bold text-base">{player.toUpperCase()}</span>
          TURN
        </div>
        <div className="flex justify-end">
          <Button onClick={clearBoard} className="h-7 text-slate-900">
            <MdRefresh size={20} />
          </Button>
        </div>
        {GRID.map((i) => {
          const currentCell = board.get(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={` w-20 h-20 rounded shadow-down shadow-slate-950 font-bold text-5xl pb-1 ${
                currentCell === "X" ? "text-blue-500" : "text-yellow-500"
              } ${
                result?.type === "winner" && result?.winningComb.includes(i)
                  ? "bg-green-900/90"
                  : "bg-slate-800"
              }`}
            >
              {(currentCell || " ").toUpperCase()}
            </button>
          );
        })}
        <div className="grid place-content-center text-center bg-teal-300/80 rounded py-1">
          <span className="text-[10px]">X(YOU)</span>
          <span className="font-bold text-sm">{stats.xWin}</span>
        </div>
        <div className="grid place-content-center text-center bg-slate-300/80 rounded py-1">
          <span className="text-[10px]">TIES</span>
          <span className="font-bold text-sm">{stats.ties}</span>
        </div>
        <div className="grid place-content-center text-center bg-yellow-500/80 rounded py-1">
          <span className="text-[10px]">O (CPU)</span>
          <span className="font-bold text-sm">{stats.oWin}</span>
        </div>
      </section>
      {result && (
        <WinnerModal
          result={result.type === "tie" ? "tie" : result.player}
          clearBoard={clearBoard}
        />
      )}
    </main>
  );
}
