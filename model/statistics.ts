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

interface RevenueSumary {
  startDate: string,
  endDate: string,
  month: string,
  totalRevenue: number,
  totalBrokerageFee: number,
  totalTradeFee: number,
  totalSecurityDeposit: number
}