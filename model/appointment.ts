interface Appointment {
  requestID: string; 
  appointmentRequestCode: string; 
  customerID: string; 
  apartmentID: string; 
  apartmentCode: string; 
  requestType: string;
  preferredDate: string; 
  preferredTime: string; 
  assignedDate: string | null;
  status: string;
  assignedTeamMemberID: string | null; 
  assigndAccountID: string; 
  createDate: string; 
  updateDate: string; 
  username: string; 
  phoneNumber: string; 
}
