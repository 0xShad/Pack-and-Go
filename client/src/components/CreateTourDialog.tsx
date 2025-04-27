import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { CreateTourForm } from "./create-tour-form";


const CreateTourDialog = () => {
  return (
    <Dialog>
        <DialogTrigger className="border-2 rounded-md cursor-pointer p-1.5 hover:bg-stone-200">Create Tour</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a tour</DialogTitle>
            </DialogHeader>
            <CreateTourForm/>
        </DialogContent>
    </Dialog>
  )
}
export default CreateTourDialog