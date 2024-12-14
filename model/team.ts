interface Member {
  teamMemberID: string;
  name: string;
  phoneNumber: string;
  email: string;
  status: string;
  isManager: boolean;
}

interface Team {
  teamID: string;
  teamName: string;
  teamDescription: string;
  teamType: string;
  managerName: string;
  members: Member[];
  results: Member[];
  teamCode: string;
}

interface Leader {
  staffId: string;
  name: string;
  isAssignedToTeam: boolean;
}
