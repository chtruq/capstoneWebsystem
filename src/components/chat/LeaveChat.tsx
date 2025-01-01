"use client";
import React from "react";
import { Button } from "../ui/button";
import { leaveChatSession } from "@/app/actions/chat";
import { usePathname, useRouter } from "next/navigation";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const LeaveChatComponent = ({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: {
    id: string;
    role: string;
    name: string;
  };
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex justify-end p-4">
      {/* <Button
        onClick={() => {
          //   leaveChatSession(sessionId, userId.id);
          //   router.push("/staff/dashboard/chat");
          //   window.location.href = "/staff/dashboard/chat";
          //   router.refresh();
        }}
        variant="destructive"
      >
        <span className="text-white">Rời phiên Chat</span>
      </Button> */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <span className="text-white">Rời phiên chat</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận rời phiên</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn rời khỏi phiên chat này không?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setOpen(false);
              }}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                leaveChatSession(sessionId, userId.id);
                router.push("/staff/dashboard/chat");
                window.location.href = "/staff/dashboard/chat";
              }}
            >
              <span className="text-white">Xác nhận</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveChatComponent;
