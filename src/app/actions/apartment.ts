import { apartmentSchema } from "@/lib/schema/apartmentSchema";
import apiClient from "./apiClient";
import { z } from "zod";

export const getApartments = async (page: number, pageIndex: number) => {
  const response = await apiClient.get(
    `/apartments/search?pageIndex=${page}&pageSize=${pageIndex}`
  );
  const data = await response.data;
  return data.data;
};

export const getApartmentsTest = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = apiClient.get(
      `/apartments/search?apartmentCode=${query}&pageIndex=${currentPage}&pageSize=8`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getApartmentsPendingRequest = async ({
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = apiClient.get(
      `/apartments/search?apartmentStatuses=0&pageIndex=${currentPage}&pageSize=10`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectApartmentCart = async ({
  currentPage,
  projectId,
}: {
  currentPage: number;
  projectId: string;
}) => {
  try {
    const res = await apiClient.get(
      `/apartments/search?projectId=${projectId}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching project apartments:", error);
    throw error;
  }
};

export const getApartmentDetails = async ({ id }: { id: string }) => {
  try {
    const res = await apiClient.get(`/apartments/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching apartment details:", error);
    throw error;
  }
};

export const approveApartment = async ({ id }: { id: string }) => {
  try {
    console.log("Approve apartment id:", id);

    const res = await apiClient.put(`/apartments/approve/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error approve apartment:", error);
    throw error;
  }
};

export const rejectApartment = async ({ id }: { id: string }) => {
  try {
    const res = await apiClient.put(`/apartments/reject/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error approve apartment:", error);
    throw error;
  }
};

export const getPendingApartments = async ({
  currentPage,
}: {
  currentPage: number;
}) => {
  try {
    const res = await apiClient.get(
      `/apartments/search?status=2&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching pending apartments:", error);
    throw error;
  }
};

// interface ApartmentValue {
//   ApartmentName: string;
//   Description: string;
//   Address: string;
//   Area: string;
//   District: string;
//   Ward: string;
//   NumberOfRooms: string;
//   NumberOfBathrooms: string;
//   Location: string;
//   Direction: string;
//   Price: string;
//   EffectiveDate: string;
//   ExpiryDate: string;
//   ApartmentType: string;
//   BalconyDirection: string;
//   Building: string;
//   Floor: string;
//   RoomNumber: string;
//   ProjectApartmentID: string;
//   Images: File[];
//   VRVideoFile: string;
//   AssignedAccountID: string;
//   Quantity: string;
// }

export const createApartment = async (
  value: z.infer<typeof apartmentSchema>
) => {
  try {
    console.log("value create single apt", value);
    const formData = new FormData();
    formData.append("ApartmentName", value.ApartmentName);
    formData.append("Description", value.Description);
    formData.append("Address", value.Address);
    formData.append("Area", value.Area);
    formData.append("District", value.District || "");
    formData.append("Ward", value.Ward || "");
    formData.append("NumberOfRooms", value.NumberOfRooms);
    formData.append("NumberOfBathrooms", value.NumberOfBathrooms);
    formData.append("Location", value.Location || "");
    formData.append("Direction", value.Direction.toString());
    formData.append("Price", value.Price);
    if (value.EffectiveDate) {
      formData.append("EffectiveDate", value.EffectiveDate);
    }
    if (value.ExpiryDate) {
      formData.append("ExpiryDate", value.ExpiryDate);
    }
    formData.append("ApartmentType", value.ApartmentType.toString());
    formData.append("BalconyDirection", value.BalconyDirection.toString());
    formData.append("Building", value.Building);
    formData.append("Floor", value.Floor);
    formData.append("RoomNumber", value.RoomNumber);
    formData.append("ProjectApartmentID", value.ProjectApartmentID);
    formData.append("VRVideoFile", value.VRVideoFile);
    formData.append("AssignedAccountID", value.AssignedAccountID);
    value.Images.forEach((image: File) => {
      formData.append("Images", image);
    });
    const res = await apiClient.post(
      "/apartments/create-apartment-for-project",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("res create apt oke", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createMultipleApartment = async (
  value: z.infer<typeof apartmentSchema>
) => {
  try {
    console.log("value create mutiple apt", value);
    const formData = new FormData();
    formData.append("ProjectApartmentID", value.ProjectApartmentID);
    formData.append("SampleApartment.ApartmentName", value.ApartmentName);
    formData.append("SampleApartment.Description", value.Description);
    formData.append("SampleApartment.Address", value.Address);
    formData.append("SampleApartment.Area", value.Area);
    formData.append("SampleApartment.District", value.District || "");
    formData.append("SampleApartment.Ward", value.Ward || "");
    formData.append("SampleApartment.NumberOfRooms", value.NumberOfRooms);
    formData.append(
      "SampleApartment.NumberOfBathrooms",
      value.NumberOfBathrooms
    );
    formData.append("SampleApartment.Location", value.Location || "");
    formData.append("SampleApartment.Direction", value.Direction.toString());
    formData.append("SampleApartment.Price", value.Price);
    if (value.EffectiveDate) {
      formData.append("SampleApartment.EffectiveDate", value.EffectiveDate);
    }
    if (value.ExpiryDate) {
      formData.append("SampleApartment.ExpiryDate", value.ExpiryDate);
    }
    formData.append(
      "SampleApartment.ApartmentType",
      value.ApartmentType.toString()
    );
    formData.append(
      "SampleApartment.BalconyDirection",
      value.BalconyDirection.toString()
    );
    formData.append("SampleApartment.Building", value.Building);
    formData.append("SampleApartment.Floor", value.Floor);
    formData.append("SampleApartment.RoomNumber", value.RoomNumber);
    formData.append("SampleApartment.VRVideoFile", value.VRVideoFile);
    formData.append(
      "SampleApartment.AssignedAccountID",
      value.AssignedAccountID
    );
    value.Images.forEach((image: File) => {
      formData.append("SampleApartment.Images", image);
    });
    formData.append("Quantity", value.Quantity);
    const res = await apiClient.post(
      "/apartments/create-multiple-apartments",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("res create multi apt oke", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

interface ConsignmentValue {
  ApartmentName: string,
  Description: string,
  Address: string,
  Area: string,
  District?: string | null,
  Ward?: string | null,
  NumberOfRooms: string,
  NumberOfBathrooms: string,
  Location?: string | null,
  Direction: number,
  ApartmentType: number,
  BalconyDirection: number,
  Building: string,
  Floor: string,
  RoomNumber: string,
  PropertyVerificationID: string,
  ProjectApartmentID: string,
  Images: File[],
  VRVideoFiles: File[],
}

export const createApartmentForOwner = async (value: ConsignmentValue) => {
  try {
    console.log("valueeeee", value);
    const formData = new FormData();
    formData.append("ApartmentName", value.ApartmentName);
    formData.append("Description", value.Description);
    formData.append("Address", value.Address);
    formData.append("Area", value.Area);
    if (value.District) {
      formData.append("District", value.District);
    }
    if (value.Ward) {
      formData.append("Ward", value.Ward);
    }
    formData.append("NumberOfRooms", value.NumberOfRooms);
    formData.append("NumberOfBathrooms", value.NumberOfBathrooms);
    if (value.Location) {
      formData.append("Location", value.Location);
    }
    formData.append("Direction", value.Direction.toString());
    formData.append("ApartmentType", value.ApartmentType.toString());
    formData.append("BalconyDirection", value.BalconyDirection.toString());
    formData.append("Building", value.Building);
    formData.append("Floor", value.Floor);
    formData.append("RoomNumber", value.RoomNumber);
    formData.append("PropertyVerificationID", value.PropertyVerificationID);
    formData.append("ProjectApartmentID", value.ProjectApartmentID);
    value.Images.forEach((file: any) => {
      formData.append("Images", file); // Truyền trực tiếp File object
    });
    value.VRVideoFiles.forEach((file: any) => {
      formData.append("VRVideoFiles", file); // Truyền trực tiếp File object
    });

    console.log(
      "formData in create apartment for owner",
      formData.forEach((value, key) => console.log(key, value))
    );

    const res = await apiClient.post("/apartments/create-apartment-for-owner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

