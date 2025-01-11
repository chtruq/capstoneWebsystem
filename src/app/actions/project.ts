import apiClient from "./apiClient";

interface ImageType {
  url: string;
  description?: string;
}

export const getProjectApartment = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = await apiClient.get(
      `/projects/search?projectName=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching project apartments:", error);
    throw error;
  }
};
export const getProjectApartmentByStaff = async ({
  userId,
  query,
  currentPage,
}: {
  userId: string;
  query: string;
  currentPage: number;
}) => {
  try {
    console.log("get project by staff");
    const res = await apiClient.get(
      `/projects/search-or-manager?accountIdofTeam=${userId}&projectName=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching project apartments:", error);
    throw error;
  }
};

export const getProjectApartmentByProvider = async ({
  providerId,
  query,
  currentPage,
}: {
  providerId: string;
  query: string;
  currentPage: number;
}) => {
  try {
    console.log("get project by provider");
    const res = await apiClient.get(
      `/projects/search-or-manager?ApartmentProjectProviderID=${providerId}&projectName=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching project apartments:", error);
    throw error;
  }
};

export const getProjectApartmentByProviderCart = async ({
  providerId,
}: {
  providerId: string;
}) => {
  try {
    console.log("get project by provider", providerId);
    const res = await apiClient.get(
      `/projects/search-or-manager?ApartmentProjectProviderID=${providerId}&pageIndex=1&pageSize=100`
    );
    console.log("resssssss", res.data.data);

    return res.data.data;
  } catch (error) {
    console.error("Error fetching project apartments:", error);
    throw error;
  }
};

export const getProject = async (id: string) => {
  try {
    const res = await apiClient.get(`/projects/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const createFinancialContract = async (data: any) => {
  try {
    console.log("data", data);

    const res = await apiClient.post("/financial-contracts/create", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFinancialContract = async (id: string) => {
  try {
    const res = await apiClient.delete(`/financial-contracts/delete/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

interface ProjectValue {
  ProjectApartmentName: string;
  ProjectApartmentDescription: string;
  Price_range: string;
  ApartmentArea?: string;
  ProjectSize?: string;
  ProjectArea?: string;
  ConstructionStartYear?: string;
  ConstructionEndYear?: string;
  Address?: string;
  AddressUrl?: string;
  TotalApartment?: string;
  LicensingAuthority: string;
  LicensingDate: string;
  ApartmentProjectProviderID: string;
  ProjectType: number;
  TeamID: string;
  FacilityIDs: string[];
  Images: File[];
}

interface ProjectUpdate {
  ProjectApartmentName: string;
  ProjectApartmentDescription: string;
  Price_range: string;
  ApartmentArea?: string;
  ProjectSize?: string;
  ProjectArea?: string;
  ConstructionStartYear?: string;
  ConstructionEndYear?: string;
  Address?: string;
  AddressUrl?: string;
  TotalApartment?: string;
  LicensingAuthority: string;
  LicensingDate: string;
  ApartmentProjectProviderID: string;
  ProjectType: number;
  TeamID: string;
}

export const createProject = async (value: any) => {
  try {
    console.log("valueeeee", value);
    const formData = new FormData();
    formData.append("ProjectApartmentName", value.ProjectApartmentName);
    formData.append(
      "ProjectApartmentDescription",
      value.ProjectApartmentDescription
    );
    formData.append("Price_range", value.Price_range);
    if (value.ApartmentArea) {
      formData.append("ApartmentArea", value.ApartmentArea);
    }
    if (value.ProjectSize) {
      formData.append("ProjectSize", value.ProjectSize);
    }
    if (value.ProjectArea) {
      formData.append("ProjectArea", value.ProjectArea);
    }
    if (value.ConstructionStartYear) {
      formData.append("ConstructionStartYear", value.ConstructionStartYear);
    }
    if (value.ConstructionEndYear) {
      formData.append("ConstructionEndYear", value.ConstructionEndYear);
    }
    if (value.Address) {
      formData.append("Address", value.Address);
    }
    if (value.AddressUrl) {
      formData.append("AddressUrl", value.AddressUrl);
    }
    if (value.TotalApartment) {
      formData.append("TotalApartment", value.TotalApartment);
    }
    formData.append("LicensingAuthority", value.LicensingAuthority);
    formData.append("LicensingDate", value.LicensingDate);
    formData.append(
      "ApartmentProjectProviderID",
      value.ApartmentProjectProviderID
    );
    formData.append("ProjectType", value.ProjectType.toString());
    formData.append("TeamID", value.TeamID);

    value.FacilityIDs.forEach((id: any) => formData.append("FacilityIDs", id));
    value.Images.forEach((image: any) => {
      formData.append("Images", image); // Truyền trực tiếp File object
    });

    console.log(
      "formData",
      formData.forEach((value, key) => console.log(key, value))
    );

    const res = await apiClient.post("/projects/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createProjectFileContract = async (data: any) => {
  try {
    console.log("data create project file", data);

    const res = await apiClient.post("/project-files/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProjectFileContract = async (id: string) => {
  try {
    const res = await apiClient.delete(`/project-files/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

interface BulkFile {
  file: File;
  description: string;
  expiryDate?: string;
  projectApartmentId?: string;
  images: File[];
  vrFiles: File[];
}

export const addProjectBulkFIle = async (data: any) => {
  try {
    console.log("data upload bulk file", data);
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("description", data.description);
    if (data.expiryDate) {
      formData.append("expiryDate", data.expiryDate);
    }
    if (data.projectApartmentId) {
      formData.append("projectApartmentId", data.projectApartmentId);
    }
    data.images.forEach((image: any) => {
      formData.append("images", image); // Truyền trực tiếp File object
    });
    data.vrFiles.forEach((vrFile: any) => {
      formData.append("vrFiles", vrFile); // Truyền trực tiếp File object
    });
    console.log(
      "formData",
      formData.forEach((value, key) => console.log(key, value))
    );

    const res = await apiClient.post("/apartments/bulk-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error : any) {
   if (error.response) {
      console.error("API Error:", error.response.data);
      return Promise.reject(error.response.data.message || "Unknown error");
    }
    console.error("Unexpected Error:", error);
    return Promise.reject("Unexpected error occurred");
  }
};

export const updateProject = async (id: string, value: ProjectUpdate) => {
  console.log("valueeeee", value);
  const formData = new FormData();
  formData.append("ProjectApartmentName", value.ProjectApartmentName);
  formData.append(
    "ProjectApartmentDescription",
    value.ProjectApartmentDescription
  );
  formData.append("Price_range", value.Price_range);
  if (value.ApartmentArea) {
    formData.append("ApartmentArea", value.ApartmentArea);
  }
  if (value.ProjectSize) {
    formData.append("ProjectSize", value.ProjectSize);
  }
  if (value.ProjectArea) {
    formData.append("ProjectArea", value.ProjectArea);
  }
  if (value.ConstructionStartYear) {
    formData.append("ConstructionStartYear", value.ConstructionStartYear);
  }
  if (value.ConstructionEndYear) {
    formData.append("ConstructionEndYear", value.ConstructionEndYear);
  }
  if (value.Address) {
    formData.append("Address", value.Address);
  }
  if (value.AddressUrl) {
    formData.append("AddressUrl", value.AddressUrl);
  }
  if (value.TotalApartment) {
    formData.append("TotalApartment", value.TotalApartment);
  }
  formData.append("LicensingAuthority", value.LicensingAuthority);
  formData.append("LicensingDate", value.LicensingDate);
  formData.append(
    "ApartmentProjectProviderID",
    value.ApartmentProjectProviderID
  );
  formData.append("ProjectType", value.ProjectType.toString());

  const res = await apiClient.put(`/projects/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const updateFacility = async (
  projectId: string | undefined,
  value: any
) => {
  const formData = new FormData();
  value.forEach((item: any) =>
    formData.append("FacilityIDs", item.facilitiesID)
  );
  const res = await apiClient.put(`/projects/update/${projectId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const deleteFacility = async (id: any) => {
  console.log("id", id);
  const res = await apiClient.delete(`/project-facilities/${id}`);
  return res;
};

export const deleteProjectImg = async (imageId: string) => {
  try {
    const res = await apiClient.delete(`/projects/image/${imageId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addProjectImg = async (projectId: string, image: any) => {
  try {
    console.log("image", image);
    const formData = new FormData();
    image.forEach((image: any) => {
      formData.append("Images", image); // Truyền trực tiếp File object
    });
    console.log(
      "formData",
      formData.forEach((value, key) => console.log(key, value))
    );
    const res = await apiClient.put(`/projects/update/${projectId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectFacility = async (id: string) => {
  try {
    const res = await apiClient.get(`/projects/${id}/facilities`);
    return res.data;
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};
