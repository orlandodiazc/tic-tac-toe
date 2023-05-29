import { useNavigate } from "react-router-dom";
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
}: {
  isReset: boolean;
  setReset: (value: boolean) => void;
}) {
  const navigate = useNavigate();
  return (
    <AlertDialog open={isReset} onOpenChange={(value) => setReset(value)}>
      <AlertDialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="text-center tracking-wider"
      >
        <AlertDialogDescription className="text-slate-300/90 text-xl">
          RESTART GAME?
        </AlertDialogDescription>
        <div className="flex gap-2 justify-center items-center">
          <AlertDialogCancel>NO, CANCEL</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              navigate(0);
            }}
          >
            YES, RESTART
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
