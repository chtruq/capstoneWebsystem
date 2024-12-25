interface Appointment {
  appointmentID: string;
  appointmentCode: string;
  apartmentID: string;
  apartmentCode: string;
  title: string;
  description: string;
  location: string;
  createDate: string;
  updatedDate: string;
  assignedDate: string | null;
  appointmentDate: string;
  appointmentStatus: string;
  appointmentTypes: string;
  startTime: string;
  endTime: string;
  assignedTeamMemberID: string | null;
  assigndAccountID: string;
  sellerName: string;
  sellerPhone: string;
  customerID: string;
  customerName: string;
  customerPhone: string;
  referenceCode: string;
}
