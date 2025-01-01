interface Statistics {
  timePeriod: string;
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalAppointments: number;
  totalAvailableApartments: number;
  totalBrokerageFee: number;
  totalSecurityDeposit: number;
  totalUsers: number;
  totalTransactions: number;
}

interface AppointmentCountByType {
  appointmentType: string;
  count: number;
}