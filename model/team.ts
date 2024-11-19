interface Member {
  name: string;
  phone: string;
  email: string;
  status: string;
}

interface Team {
  teamID: string;
  teamName: string;
  teamDescription: string;
  teamType: string;
  managerName: string;
  members: Member[];
  teamCode: string;
}

interface Leader {
  staffId: string;
  name: string;
  isAssignedToTeam: boolean;
}
