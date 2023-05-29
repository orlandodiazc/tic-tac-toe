import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useState } from "react";
import ToggleMark from "../components/ToggleMark";
import { Player } from "./Board";
import Button from "../components/ui/Button";

export default function Home() {
  const [mark, setMark] = useState<Player>("X");
  return (
    <main className="bg-slate-900 h-full flex items-center">
      <div className="px-1 w-full max-w-md m-auto flex flex-col gap-1">
        <div className="text-center text-xl">
          <Logo className="font-black" />
        </div>
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 text-center bg-slate-800 p-6 rounded shadow-down shadow-slate-950">
            <h2 className="text-sm text-slate-300/90 tracking-wider">
              PICK PLAYER 1'S MARK
            </h2>
            <ToggleMark
              mark={mark}
              onOptionChange={(e) => setMark(e.target.value as Player)}
            />
            <p className="text-xs text-slate-300/60">REMEMBER: X GOES FIRST</p>
          </div>
          <div className="flex flex-col gap-4">
            <Button asChild variant="blue">
              <Link
                to="/play/cpu"
                state={{
                  isVersusCPU: true,
                  playerMark: mark,
                  cpuMark: mark === "X" ? "O" : "X",
                }}
              >
                NEW GAME (VS CPU)
              </Link>
            </Button>
            <Button asChild variant="yellow">
              <Link to="/play/pvp" state={{ isVersusCPU: false }}>
                NEW GAME (VS PLAYER)
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
