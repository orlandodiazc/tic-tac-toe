import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
} from "./ui/AlertDialog";

export default function ResetModal({
  isReset,
  setReset,
  clearBoard,
  clearStats,
}: {
  isReset: boolean;
  clearBoard: () => void;
  setReset: (value: boolean) => void;
  clearStats: () => void;
}): JSX.Element {
  return (
    <AlertDialog
      open={isReset}
      onOpenChange={(value) => {
        setReset(value);
      }}
    >
      <AlertDialogContent
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        className="text-center tracking-wider"
      >
        <AlertDialogDescription className="text-slate-300/90 text-xl">
          RESTART GAME?
        </AlertDialogDescription>
        <div className="flex gap-2 justify-center items-center">
          <AlertDialogCancel>NO, CANCEL</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              clearBoard();
              clearStats();
            }}
          >
            YES, RESTART
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
