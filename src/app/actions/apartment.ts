import apiClient from "./apiClient";

export const getApartments = async (page: number, pageIndex: number) => {
  try {
    const response = await apiClient.get(
      `/apartments/search?pageIndex=${page}&pageSize=${pageIndex}`
    );
    const data = await response.data;
    return data.data;
  } catch (e) {
    throw e;
  }
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
      `/apartments/search?apartmentName=${query}&pageIndex=${currentPage}&pageSize=8`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getApartmentsPendingRequest = async ({
  query,
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


interface ApartmentValue {
  ApartmentName: string;
  Description: string;
  Address: string;
  Area: string;
  District: string;
  Ward: string;
  NumberOfRooms: string;
  NumberOfBathrooms: string;
  Location: string;
  Direction: string;
  Price: string;
  EffectiveDate: string;
  ExpiryDate: string;
  ApartmentType: string;
  BalconyDirection: string;
  Building: string;
  Floor: string;
  RoomNumber: string;
  ProjectApartmentID: string;
  Images: File[];
  VRVideoFile: string;
  AssignedAccountID: string;
  Quantity: string;
}

export const createApartment = async (value: ApartmentValue) => {
  try {
    console.log("value create apt", value);
    const formData = new FormData();
    formData.append("ApartmentName", value.ApartmentName);
    formData.append("Description", value.Description);
    formData.append("Address", value.Address);
    formData.append("Area", value.Area);
    formData.append("District", value.District);
    formData.append("Ward", value.Ward);
    formData.append("NumberOfRooms", value.NumberOfRooms);
    formData.append("NumberOfBathrooms", value.NumberOfBathrooms);
    formData.append("Location", value.Location);
    formData.append("Direction", value.Direction);
    formData.append("Price", value.Price);
    formData.append("EffectiveDate", value.EffectiveDate);
    formData.append("ExpiryDate", value.ExpiryDate);
    formData.append("ApartmentType", value.ApartmentType);
    formData.append("BalconyDirection", value.BalconyDirection);
    formData.append("Building", value.Building);
    formData.append("Floor", value.Floor);
    formData.append("RoomNumber", value.RoomNumber);
    formData.append("ProjectApartmentID", value.ProjectApartmentID);
    formData.append("VRVideoFile", value.VRVideoFile);
    formData.append("AssignedAccountID", value.AssignedAccountID);
    value.Images.forEach((image) => {
      formData.append("Images", image);
    });
    const res = await apiClient.post("/apartments/create-apartment-for-project", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("res create apt", res);
    return res;

  } catch (error) {
    console.log(error);
  }
}; 

export const createMultipleApartment = async (value: ApartmentValue) => {
  try {
    console.log("value create mutiple apt", value);
    const formData = new FormData();
    formData.append("ProjectApartmentID ", value.ProjectApartmentID);
    formData.append("ApartmentName", value.ApartmentName);
    formData.append("Description", value.Description);
    formData.append("Address", value.Address);
    formData.append("Area", value.Area);
    formData.append("District", value.District);
    formData.append("Ward", value.Ward);
    formData.append("NumberOfRooms", value.NumberOfRooms);
    formData.append("NumberOfBathrooms", value.NumberOfBathrooms);
    formData.append("Location", value.Location);
    formData.append("Direction", value.Direction);
    formData.append("Price", value.Price);
    formData.append("EffectiveDate", value.EffectiveDate);
    formData.append("ExpiryDate", value.ExpiryDate);
    formData.append("ApartmentType", value.ApartmentType);
    formData.append("BalconyDirection", value.BalconyDirection);
    formData.append("Building", value.Building);
    formData.append("Floor", value.Floor);
    formData.append("RoomNumber", value.RoomNumber);
    formData.append("ProjectApartmentID", value.ProjectApartmentID);
    formData.append("VRVideoFile", value.VRVideoFile);
    formData.append("AssignedAccountID", value.AssignedAccountID);
    value.Images.forEach((image) => {
      formData.append("Images", image);
    });
    formData.append("Quantity", value.Quantity);
    const res = await apiClient.post("/apartments/create-multiple-apartments", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("res create apt", res);
    return res;

  } catch (error) {
    console.log(error);
  }
}