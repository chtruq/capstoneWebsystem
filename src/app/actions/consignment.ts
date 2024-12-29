import apiClient from "./apiClient";
import { z } from "zod";


export const getConsignment = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = await apiClient.get(
      `/property-verifications/search?keyword=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    // console.log("Data Data consignment", res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getConsignmentDetail = async ({
  verificationID
}: {
  verificationID: string;
}) => {
  try {
    const res = await apiClient.get(
      `/property-verifications/${verificationID}`
    );
    // console.log("Data Data consignment", res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRequestProperty = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = await apiClient.get(
      `/property-requests/search?keyword=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    console.log("Data request propertyyyyyyyyyy", res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const rejectRequestConsignment = async (requestId: string, sellerId: string, note: string) => {
  try {
    const res = await apiClient.put(`/property-requests/reject/${requestId}?sellerId=${sellerId}&note=${note}`);
    console.log("Res in reject", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const acceptRequestConsignment = async (requestId: string, sellerId: string) => {
  try {
    console.log("Request ID accept", requestId);
    console.log("Seller ID in accept:", sellerId);

    const res = await apiClient.put(`/property-requests/accept/${requestId}?sellerId=${sellerId}`);
    console.log("Res in accept", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

interface ConsignmentValue {
  VerificationName: string,
  LegalDocumentFiles: File[],
  Comments?: string | null,
  ApartmentOwnerApartmentID?: string | null,
  ApartmentOwnerID: string,
  AssignedAccountID: string,
  PropertyValue: string,
  DepositValue: string,
  BrokerageFee: string,
  CommissionRate: string,
  EffectiveDate: string,
  ExpiryDate: string,
}


export const createConsignment = async (value: ConsignmentValue) => {
  try {
    console.log("valueeeee", value);
    const formData = new FormData();
    formData.append("VerificationName", value.VerificationName);
    if (value.Comments) {
      formData.append("Comments", value.Comments);
    }
    if (value.ApartmentOwnerApartmentID) {
      formData.append("ApartmentOwnerApartmentID", value.ApartmentOwnerApartmentID);
    }
    formData.append("ApartmentOwnerID", value.ApartmentOwnerID);
    formData.append("AssignedAccountID", value.AssignedAccountID);
    formData.append("PropertyValue", value.PropertyValue);
    formData.append("DepositValue", value.DepositValue);
    formData.append("BrokerageFee", value.BrokerageFee);
    formData.append("CommissionRate", value.CommissionRate);
    formData.append("EffectiveDate", value.EffectiveDate);
    formData.append("ExpiryDate", value.ExpiryDate);
    value.LegalDocumentFiles.forEach((file: any) => {
      formData.append("LegalDocumentFiles", file); // Truyền trực tiếp File object
    });

    console.log(
      "formData",
      formData.forEach((value, key) => console.log(key, value))
    );

    const res = await apiClient.post("/property-verifications/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const acceptConsignment = async (verificationId: string) => {
  try {
    console.log("verificationId in accept", verificationId );

    const res = await apiClient.post(`/property-verifications/accept/${verificationId}`);
    console.log("Res in accept", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export const rejectConsignment = async (verificationId: string) => {
  try {
    console.log("verificationId in accept", verificationId );

    const res = await apiClient.post(`/property-verifications/reject/${verificationId}`);
    console.log("Res in reject", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}