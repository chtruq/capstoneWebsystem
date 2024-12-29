import { OwnerSchema } from "@/lib/schema/ownerSchema";
import apiClient from "./apiClient";
import { z } from "zod";

export const getApartmentOwners = async () => {
  const res = await apiClient.get("/apartment-owners/get-all");

  return res.data.data;
};


export const searchOwners = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = await apiClient.get(
      `/apartment-owners/search?name=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    // console.log("Data Data consignment", res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkOwnerExist = async (id: string) => {
  const res = await apiClient.get(`/apartment-owners/search?accountId=${id}`);
  if (res.data.data.totalItems > 0) {
    return true;
  } else {
    return false;
  }
  // return res.data.data.totalItems;
};

interface Owner {
  Name: string;
  Email: string;
  PhoneNumber: string;
  NationalID: string;
  IssueDate: string;
  BirthDate: string;
  Nationality: string;
  Gender: number;
  Address: string;
  AccountID: string;
}

export const createOwner = async (data: Owner) => {
  try {
    console.log("Data in create owner", data);
    const fromData = new FormData();

    fromData.append("Name", data.Name);
    fromData.append("Email", data.Email);
    fromData.append("PhoneNumber", data.PhoneNumber);
    fromData.append("NationalID", data.NationalID);
    fromData.append("IssueDate", data.IssueDate);
    fromData.append("BirthDate", data.BirthDate);
    fromData.append("Nationality", data.Nationality);
    fromData.append("Gender", data.Gender.toString());
    fromData.append("Address", data.Address);
    fromData.append("AccountID", data.AccountID);
    fromData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    console.log("Data in create owner", fromData);

    const res = await apiClient.post("/apartment-owners/create-owner", fromData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Res in create owner", res);
    return res.data;
  } catch (error) {
    console.error("Error in owner:", error);
    throw error;
  }
}