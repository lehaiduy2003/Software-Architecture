import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

interface CustomDialogProps {
  isOpen: boolean;
  type: "cart" | "auth";
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  type,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogTitle>{type === "cart" ? <div>Confirmation</div> : <div>Alert</div>}</DialogTitle>
        <DialogDescription>{message}</DialogDescription>
        <DialogFooter>
          {type === "cart" ? (
            <>
              <button onClick={onConfirm}>Confirm</button>
              <DialogClose asChild>
                <button onClick={onCancel}>Cancel</button>
              </DialogClose>
            </>
          ) : (
            <DialogClose asChild>
              <button onClick={onCancel}>Close</button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
