import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WinnerModal({
  result,
  clearBoard,
}: {
  result: "X" | "O" | "tie";
  clearBoard: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(true);
  }, [result]);

  const navigate = useNavigate();

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0" />
        <AlertDialog.Content
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="tracking-wider opacity-95  fixed top-1/2 left-1/2 bg-slate-700 -translate-x-1/2  -translate-y-14 w-screen md:w-1/2 md:rounded-lg p-4  flex flex-col gap-3 text-center py-6"
        >
          <AlertDialog.Title className="text-slate-300/90">
            ROUND ENDED
          </AlertDialog.Title>
          <AlertDialog.Description className="text-cyan-500  flex justify-center items-center gap-3">
            {result !== "tie" ? (
              <span className="text-5xl font-extrabold">
                {result.toUpperCase()}
              </span>
            ) : null}{" "}
            <span className="text-2xl font-bold">
              {result === "tie" ? "THE ROUND WAS A TIE" : "TAKES THE ROUND!"}
            </span>
          </AlertDialog.Description>
          <div className="flex justify-center gap-2 font-bold">
            <AlertDialog.Action asChild>
              <button
                aria-label="Quit"
                className="py-2 px-4 rounded bg-slate-400/90 font-semibold shadow-down  shadow-slate-500"
                value="quit"
                onClick={() => {
                  clearBoard();
                  navigate("/");
                }}
              >
                QUIT
              </button>
            </AlertDialog.Action>
            <AlertDialog.Cancel asChild>
              <button
                aria-label="Quit"
                className="py-2 px-4 rounded bg-yellow-500/90 tracking-wide font-semibold shadow-down  shadow-yellow-600"
                onClick={clearBoard}
              >
                NEXT ROUND
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
