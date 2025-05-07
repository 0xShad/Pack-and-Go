import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateTourForm } from "./create-tour-form";

const CreateTourDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="border-2 rounded-md cursor-pointer p-1.5 hover:bg-stone-200"
        >
          Create Tour
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a tour</DialogTitle>
        </DialogHeader>
        <DialogDescription>dwad</DialogDescription>
        <CreateTourForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTourDialog;
