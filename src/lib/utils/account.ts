export const accountStatusOptions = (value: string) => {
  switch (value) {
    case "Active":
      return "Hoạt động";
    case "Inactive":
      return "Chưa kích hoạt";
    case "Locked":
      return "Đã khoá";
    default:
      return "Không xác định";
  }
};
