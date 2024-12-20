interface DepositProfile {
  fullName: string;
  identityCardNumber: string;
  dateOfIssue: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  email: string;
  phoneNumber: string;
  identityCardFrontImage: string;
  identityCardBackImage: string;
}

interface Deposit {
  depositID: string;
  depositCode: string;
  oldDepositCode: string | null;
  apartmentCode: string;
  depositPercentage: number;
  depositAmount: number;
  paymentAmount: number;
  brokerageFee: number;
  commissionFee: number;
  securityDeposit: number;
  tradeFee: number | null;
  note: string;
  description: string;
  createDate: string;
  updateDate: string;
  expiryDate: string;
  depositStatus: number;
  depositType: number;
  disbursementStatus: number;
  accountID: string;
  apartmentID: string;
  staffID: string | null;
  depositProfile: DepositProfile[];
}
