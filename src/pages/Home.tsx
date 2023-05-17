import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export default function Home() {
  return (
    <main className="bg-slate-900 h-full flex items-center">
      <div className="px-1 w-full max-w-md m-auto flex flex-col gap-1">
        <div className="text-center text-xl">
          <Logo className="font-black" />
        </div>
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 text-center bg-slate-800 p-6 rounded shadow-down shadow-slate-950">
            <h2 className="text-sm text-slate-300/90 tracking-wider">
              PICK PLAYER 1'S MARK
            </h2>
            <ToggleGroup.Root
              type="single"
              defaultValue="x"
              aria-label="Pick mark"
              onValueChange={(value) => console.log(value)}
              className="p-1 bg-slate-900 grid grid-flow-col gap-1 rounded font-extrabold h-12"
            >
              <ToggleGroup.Item
                value="x"
                className="text-slate-300/90 data-[state=on]:text-slate-900 data-[state=on]:bg-slate-300/90 rounded"
              >
                X
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="o"
                className="text-slate-300/90 data-[state=on]:text-slate-900 data-[state=on]:bg-slate-300/90 rounded"
              >
                O
              </ToggleGroup.Item>
            </ToggleGroup.Root>
            <p className="text-xs text-slate-300/60">REMEMBER: X GOES FIRST</p>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              to="/play"
              className="text-center p-2 rounded tracking-wide font-semibold shadow-down hover:opacity-90 bg-yellow-500/90 shadow-yellow-600 "
            >
              NEW GAME (VS CPU)
            </Link>
            <Link
              to="/play"
              className="text-center p-2 rounded tracking-wide font-semibold shadow-down hover:opacity-90 bg-blue-500/90 shadow-blue-600 "
            >
              NEW GAME (VS PLAYER)
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
