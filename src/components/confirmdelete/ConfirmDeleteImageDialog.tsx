import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { deleteProjectImg } from "@/app/actions/project";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteApartmentImg } from "@/app/actions/apartment";

interface ConfirmDeleteDialogProps {
  imageID: string;
}

const ConfirmApartmentDeleteDialog: FC<ConfirmDeleteDialogProps> = ({ imageID }) => {
  const router = useRouter();
  const handleDeleteImage = async (imageID: string) => {
    try {
      const res = await deleteApartmentImg(imageID);
      if (res) {
        toast.success("Xoá thành công", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Xác nhận xoá ảnh</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xoá ảnh này không?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <Button
            onClick={() => {
              handleDeleteImage(imageID);
            }}
            type="submit"
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmApartmentDeleteDialog;
