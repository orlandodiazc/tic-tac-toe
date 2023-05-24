import { ChangeEvent } from "react";

export default function ToggleMark({
  onOptionChange,
  mark,
}: {
  onOptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  mark: "O" | "X";
}) {
  return (
    <>
      <ul className="grid gap-2 grid-cols-2 bg-slate-900 p-1 rounded font-extrabold">
        <li>
          <input
            type="radio"
            id="X"
            name="track"
            value="X"
            className="hidden peer"
            checked={mark === "X"}
            onChange={onOptionChange}
          />
          <label
            htmlFor="X"
            className="inline-flex items-center justify-center w-full p-3 text-slate-300/90 peer-checked:text-slate-900 bg-slate-900 peer-checked:bg-slate-300/90 rounded cursor-pointer hover:opacity-80"
          >
            X
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="O"
            name="track"
            value="O"
            className="hidden peer"
            checked={mark === "O"}
            onChange={onOptionChange}
          />
          <label
            htmlFor="O"
            className="inline-flex items-center justify-center w-full p-3 text-slate-300/90 peer-checked:text-slate-900 bg-slate-900 rounded cursor-pointer peer-checked:bg-slate-300/90 hover:opacity-80"
          >
            O
          </label>
        </li>
      </ul>
    </>
  );
}
