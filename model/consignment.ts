interface LegalDocument {
  fileName: string;
  fileUrl: string;
  createDate: string;
  updateDate: string;
}

interface Consignment {
  verificationID: string;
  createDate: string;
  updateDate: string;
  contractCode: string;
  verificationStatus: string;
  verificationName: string;
  legalDocuments: LegalDocument[];
  comments: string | null;
  apartmentOwnerApartmentID: string;
  propertyValue: number;
  depositValue: number;
  brokerageFee: number;
  securityDeposit: number;
  commissionRate: number;
  effectiveDate: string;
  expiryDate: string;
  hasApartment: boolean;
  ownerName: string;
  ownerPhoneNumber: string;
  ownerEmail: string;
  assignedTeamMemberName: string;
}
