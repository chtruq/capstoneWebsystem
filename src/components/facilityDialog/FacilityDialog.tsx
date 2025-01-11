"use client";

import React, { FC, useEffect, useState } from "react";
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
import { MultiSelect } from "../ui/multi-select";
import {
  deleteFacility,
  getProjectFacility,
  updateFacility,
  updateProject,
} from "@/app/actions/project";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FacilityDialogProps {
  data?: Project;
  facility?: Facility[];
}

interface projectFacilities {
  facilitiesID: string;
  projectApartmentID: string;
  projectFacilityID: string;
}

const FacilityDialog: FC<FacilityDialogProps> = ({ data, facility }) => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [oldFacilities, setOldFacilities] = useState<Facility[]>(
    data?.facilities || []
  );
  const [projectFacilities, setProjectFacilities] =
    useState<projectFacilities[]>();

  const router = useRouter();

  const fetchFacility = async () => {
    if (!data?.projectApartmentID) {
      return;
    }
    const res = await getProjectFacility(data.projectApartmentID);

    setProjectFacilities(res);
  };

  useEffect(() => {
    fetchFacility();
  }, [data]);

  const updateFacilityFuct = async (value: any) => {
    const res = await updateFacility(data?.projectApartmentID, value);
    toast.success("Cập nhật tiện ích thành công");
    if (res) {
      router.refresh();
    }
    //close dialog

    return res;
  };

  const deleteFacilityFuct = async (value: any) => {
    value.map(async (item: any) => {
      const res = await deleteFacility(item);
      return res;
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Thay đổi</Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] 
        sm:w-full
        h-1/2
        "
        >
          <DialogHeader>
            <DialogTitle>Thay đổi tiện ích</DialogTitle>
          </DialogHeader>
          <div className="mt-4 h-3/4">
            <MultiSelect
              options={
                facility?.map((item) => ({
                  label: item.facilitiesName,
                  value: item.facilitiesID,
                })) || []
              }
              value={data?.facilities?.map((item) => item.facilitiesID) || []}
              onValueChange={(value) =>
                setFacilities(
                  facility?.filter((item) =>
                    value.includes(item.facilitiesID)
                  ) || []
                )
              }
              placeholder="Chọn tiện ích nội khu"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                deleteFacilityFuct(
                  projectFacilities?.map((item) => item.projectFacilityID)
                );
                updateFacilityFuct(facilities);
              }}
            >
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacilityDialog;
