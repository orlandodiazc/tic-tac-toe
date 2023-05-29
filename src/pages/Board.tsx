import { useEffect, useState } from "react";
import WinnerModal from "../components/WinnerModal";
import Logo from "../components/Logo";
import Button from "../components/ui/Button";
import { MdRefresh } from "react-icons/md";
import minimax, { isWinner } from "../utils/gameboard";
import { useLocation } from "react-router-dom";
import ResetModal from "../components/ResetModal";
import clsx from "clsx";

const GRID = Array.from(Array(9).keys());

export type Player = "X" | "O";

type Result =
  | { type: "tie" }
  | { type: "winner"; player: Player; winningComb: number[] };

interface Stats {
  ties: number;
  xWin: number;
  oWin: number;
}

interface State {
  isVersusCPU: boolean;
  playerMark: Player;
  cpuMark: Player;
}

export default function Board(): JSX.Element {
  const { state, pathname } = useLocation();

  const defaultState =
    pathname === "/play/cpu"
      ? { isVersusCPU: true, playerMark: "X", cpuMark: "O" }
      : { isVersusCPU: false };

  const { isVersusCPU, playerMark, cpuMark }: State = state ?? defaultState;

  const [board, setBoard] = useState<Map<number, Player>>(() => new Map());
  const [result, setResult] = useState<Result>();
  const [stats, setStats] = useState<Stats>({ ties: 0, xWin: 0, oWin: 0 });
  const [player, setPlayer] = useState<Player>(playerMark ?? "X");
  const [isReset, setReset] = useState<boolean>(false);

  function setupCPU(): void {
    if (isVersusCPU && cpuMark === "X")
      setBoard(new Map().set(Math.floor(Math.random() * 9), "X"));
  }

  useEffect(() => {
    setupCPU();
  }, []);

  function handleClick(cell: number): void {
    if (board.has(cell)) return;
    let winningComb;

    const draft = new Map(board).set(cell, player);
    let draftPlayer = player;
    winningComb = isWinner(draft, player);

    if (isVersusCPU && winningComb == null && draft.size < 9) {
      const aiMove = minimax(draft, 9 - draft.size, cpuMark);
      draft.set(aiMove.move, cpuMark);
      winningComb = isWinner(draft, cpuMark);
      draftPlayer = cpuMark;
    } else {
      setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    }
    setBoard(draft);
    if (winningComb != null) {
      setResult({ type: "winner", player: draftPlayer, winningComb });
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

  function clearBoard(): void {
    setResult(undefined);
    setTimeout(() => {
      setBoard(new Map());
      setupCPU();
      setPlayer(playerMark ?? "X");
    }, 100);
  }
  return (
    <main className="bg-slate-900 h-full flex items-center">
      <section className="grid grid-cols-3 gap-4 bg-slate-900 p-2 rounded m-auto">
        <div className="flex items-center gap-0.5">
          <Logo className="font-extrabold text-lg" />
        </div>
        <div className="flex items-center justify-center gap-1 bg-slate-800 rounded text-xs text-slate-300/90 shadow-down shadow-slate-950 ">
          <span className="font-bold text-base">{player.toUpperCase()}</span>
          TURN
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (
                board.size !== 0 ||
                Object.values(stats).some((value) => value !== 0)
              ) {
                setReset(true);
              }
            }}
            className="h-7 text-slate-900"
          >
            <MdRefresh size={20} />
          </Button>
        </div>
        {GRID.map((i) => {
          const currentCell = board.get(i);
          const isCellWinnerComb =
            result?.type === "winner" && result?.winningComb.includes(i);
          return (
            <button
              key={i}
              onClick={() => {
                handleClick(i);
              }}
              className={clsx(
                "w-20 h-20 rounded shadow-down  text-blue-500 shadow-slate-950 font-bold text-5xl pb-1",
                {
                  "text-blue-500": currentCell === "X",
                  "text-yellow-500": currentCell === "O",
                  "bg-slate-800": !isCellWinnerComb,
                  "bg-green-900/90": isCellWinnerComb,
                }
              )}
            >
              {(currentCell ?? " ").toUpperCase()}
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
      {result != null && (
        <WinnerModal
          result={result.type === "tie" ? "tie" : result.player}
          clearBoard={clearBoard}
        />
      )}
      {isReset && (
        <ResetModal
          clearBoard={clearBoard}
          isReset={isReset}
          clearStats={() => {
            setStats({ ties: 0, xWin: 0, oWin: 0 });
          }}
          setReset={setReset}
        />
      )}
    </main>
  );
}
