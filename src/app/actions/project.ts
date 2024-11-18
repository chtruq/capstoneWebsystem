import apiClient from "./apiClient";

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

export const createProject = async (value) => {
  try {
    console.log("valueeeee", value);
    const formData = new FormData();
    formData.append("ProjectApartmentName", value.ProjectApartmentName);
    formData.append(
      "ProjectApartmentDescription",
      value.ProjectApartmentDescription
    );
    formData.append("Price_range", value.Price_range);
    formData.append("ApartmentArea", value.ApartmentArea);
    formData.append("ProjectSize", value.ProjectSize);
    formData.append("ProjectArea", value.ProjectArea);
    formData.append("ConstructionStartYear", value.ConstructionStartYear);
    formData.append("ConstructionEndYear", value.ConstructionEndYear);
    formData.append("Address", value.Address);
    formData.append("AddressUrl", value.AddressUrl);
    formData.append("TotalApartment", value.TotalApartment);
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
