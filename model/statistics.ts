interface Statistics {
  timePeriod: string;
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalServiceFee: number;
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

interface RevenueSumary {
  startDate: string,
  endDate: string,
  month: string,
  totalRevenue: number,
  totalBrokerageFee: number,
  totalServiceFee: number,
  totalSecurityDeposit: number
}

interface StatisticsForProvider{
  providerName: string,
  accountId: string,
  timePeriod: string,
  startDate: string,
  endDate: string,
  totalProjects: number,
  totalApartments: number,
  availableApartments: number,
  totalDeposits: number,
}