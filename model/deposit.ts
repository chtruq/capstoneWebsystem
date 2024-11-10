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
  depositPercentage: number;
  depositAmount: number;
  paymentAmount: number;
  note: string;
  description: string;
  createDate: string;
  updateDate: string;
  expiryDate: string;
  depositStatus: number;
  accountID: string;
  apartmentID: string;
  depositProfile: DepositProfile[];
}
