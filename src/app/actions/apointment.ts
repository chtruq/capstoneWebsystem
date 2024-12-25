import apiClient from "./apiClient";
import { z } from "zod";
import { AppointmentSchema } from "@/lib/schema/appointmentSchema";

export const getRequestAppointment = async () => {
  try {
    const res: any = await apiClient.get("/appointmentrequests/get-all");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRequestAppointmentByTeam = async ({
  query,
  currentPage,
  teamID,
}: {
  query: string;
  currentPage: number;
  teamID: string;
}) => {
  try {
    const res = await apiClient.get(
      `/appointmentrequests/search?keyword=${query}&teamId=${teamID}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const rejectRequestAppointment = async (requestId: string, sellerId: string, note: string) => {
  try {
    const res = await apiClient.put(`/appointmentrequests/reject/${requestId}?sellerId=${sellerId}&note=${note}`);
    console.log("Res in reject", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const accepttRequestAppointment = async (requestId: string, sellerId: string) => {
  try {
    console.log("Request ID in reject", requestId);
    console.log("Seller ID in reject:", sellerId);

    const res = await apiClient.put(`/appointmentrequests/accept/${requestId}?sellerId=${sellerId}`);
    console.log("Res in reject", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const createAppointment = async (data: z.infer<typeof AppointmentSchema>) => {
  try {
    console.log("Data in create appointment", data);
    const fromData = new FormData();
    fromData.append("Title", data.title);
    fromData.append("Description", data.description);
    fromData.append("Location", data.location);
    fromData.append("AppointmentDate", data.appointmentDate);
    fromData.append("StartTime", data.startTime);
    fromData.append("AssignedStaffAccountID", data.assignedStaffAccountID);
    fromData.append("CustomerID", data.customerID);
    if (data.apartmentID) {
      fromData.append("ApartmentID", data.apartmentID);
    }
    fromData.append("ReferenceCode", data.referenceCode);
    fromData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    console.log("Data in create appointment", fromData);

    const res = await apiClient.post("/appointments/create-appointment", fromData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Res in create appointment", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getAppointment = async () => {
  try {
    const res: any = await apiClient.get("/appointments/get-all");
    console.log("Res in get appointment", res);

    return res.data;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        response: (error as any).response ? {
          status: (error as any).response.status,
          statusText: (error as any).response.statusText,
          data: (error as any).response.data,
        } : null,
      });
    } else {
      console.error('Unknown error', error);
    }
  }
};

export const getAppointmentByTeamId = async ({
  query,
  currentPage,
  teamID,
}: {
  query: string;
  currentPage: number;
  teamID: string;
}) => {
  try {
    const res = await apiClient.get(
      `/appointments/search?keyword=${query}&TeamID=${teamID}&PageIndex=${currentPage}&PageSize=10`
    );
    // console.log("Res in get appointment by team", res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};


