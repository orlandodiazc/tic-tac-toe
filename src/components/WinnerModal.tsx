import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

export default function WinnerModal({ winner }: { winner: "X" | "O" }) {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(true);
  }, [winner]);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="tracking-wider fixed top-1/2 left-1/2 bg-slate-700 -translate-x-1/2 w-screen md:w-1/2 md:rounded-lg -translate-y-1/2 p-4  flex flex-col gap-3 text-center py-6">
          <Dialog.Title className="text-slate-300/90">YOU WON!</Dialog.Title>
          <Dialog.Description className="text-cyan-500  flex justify-center items-center gap-3">
            <span className="text-5xl font-extrabold">
              {winner.toUpperCase()}
            </span>{" "}
            <span className="text-2xl font-bold">TAKES THE ROUND!</span>
          </Dialog.Description>
          <div className="flex justify-center gap-2 font-bold">
            <Dialog.Close asChild>
              <button
                aria-label="Quit"
                className="p-2 rounded bg-slate-400/90 font-semibold shadow-down  shadow-slate-500"
              >
                QUIT
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                aria-label="Quit"
                className="p-2 rounded bg-yellow-500/90 tracking-wide font-semibold shadow-down  shadow-yellow-600"
              >
                NEXT ROUND
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
