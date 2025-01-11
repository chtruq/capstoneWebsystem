"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileDown, X } from "lucide-react";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { deleteProjectFileContract } from "@/app/actions/project";
interface Props {
  id: string;
  type: string;
  title: string;
  fileName?: string;
}

const DialogConfirm: FC<Props> = ({ id, type, title, fileName }) => {
  const [isOpened, setIsOpened] = useState(false);
  console.log("ID", id);
  const pathName = usePathname();

  async function onSubmit() {
    console.log("Submit");
    try {
      switch (type) {
        case "project-file":
          const res = await deleteProjectFileContract(id);
          console.log("res", res);
          revalidateProjectPath(pathName);
          setIsOpened(false);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <X className="cursor-pointer"/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>Bạn có chắc chắn muốn xóa file "{fileName}" này không?</p>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setIsOpened(false)}>
            Từ chối
          </Button>
          <Button onClick={onSubmit}>
            Chấp nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export default DialogConfirm;