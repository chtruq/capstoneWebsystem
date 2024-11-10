interface ProjectImage {
  imageID: string;
  imageUrl: string;
  description: string;
}

interface Facility {
  facilityID: string;
  facilityName: string;
}

interface Project {
  projectApartmentID: string;
  projectApartmentName: string;
  projectApartmentDescription: string;
  price_range: string;
  createDate: string;
  updateDate: string;
  projectApartmentStatus: string;
  apartmentProjectProviderID: string;
  apartmentProjectProviderName: string | null;
  projectImages: ProjectImage[];
  facilities: Facility[];
  projectType: string;
  teamID: string;
}

export default Project;
