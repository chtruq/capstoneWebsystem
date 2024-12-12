interface ProjectImage {
  projectImageID: string;
  description: string;
  url: string;
}

interface ApartmentStatusCount {
  [key: string]: number;
}

interface FinancialContract {
  financialContractID: string;
  lowestPrice: number;
  highestPrice: number;
  depositAmount: number;
  brokerageFee: number;
  commissionFee: number;
}

interface ProjectFile {
  // Define the structure of project files if needed
  projectFileID: string;
  projectFileDate: string;
  projectFileDescription: string;
}

interface Project {
  projectApartmentID: string;
  projectApartmentName: string;
  projectCode: string;
  projectApartmentDescription: string;
  price_range: string;
  apartmentArea: string | null;
  projectSize: string | null;
  projectArea: string | null;
  constructionStartYear: string | null;
  constructionEndYear: string | null;
  address: string | null;
  addressUrl: string | null;
  totalApartment: number | null;
  licensingAuthority: string | null;
  licensingDate: Date | null;
  createDate: string;
  updateDate: string;
  projectApartmentStatus: string;
  apartmentProjectProviderID: string;
  apartmentProjectProviderName: string | null;
  projectImages: ProjectImage[];
  facilities: Facility[]; // Adjust the type based on the actual structure of facilities
  projectType: string;
  teamID: string;
  teamName: string;
  financialContracts: FinancialContract[];
  projectFiles: ProjectFile[];
  totalApartments: number;
  apartmentStatusCount: ApartmentStatusCount;
}



