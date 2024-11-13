import React, { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface Props {
  btnTitle: string;
  title: string;
  description: string;
  btnActionTitle: string;
  action: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogAction: FC<Props> = ({
  btnTitle,
  title,
  description,
  btnActionTitle,
  action,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{btnTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2"></div>
          {/* <Button type="submit" size="sm" className="px-3"></Button> */}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Đóng
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={() => {
                action();
              }}
              type="submit"
              variant="default"
            >
              {btnActionTitle}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAction;
