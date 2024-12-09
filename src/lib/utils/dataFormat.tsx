export const formatDateTime = (isoDateString: string): string => {
  if (!isoDateString) return "N/A"; // Xử lý trường hợp dữ liệu không hợp lệ
  const date = new Date(isoDateString);
  const day = date.getUTCDate().toString().padStart(2, "0"); // Lấy ngày và thêm 0 n
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 0
  const year = date.getUTCFullYear().toString(); // Lấy năm
  const hours = date.getUTCHours().toString().padStart(2, "0"); // Lấy giờ và thêm 0
  const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Lấy phút và thêm 0

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


export const formatDate = (isoDateString: string): string => {
  if (!isoDateString) return "N/A"; // Xử lý trường hợp dữ liệu không hợp lệ
  const date = new Date(isoDateString);
  const day = date.getUTCDate().toString().padStart(2, "0"); // Lấy ngày và thêm 0 n
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 0
  const year = date.getUTCFullYear().toString(); // Lấy năm
  
  return `${day}/${month}/${year}`;
}

export const formatMoney = (moneyString: number): string => {
  if (!moneyString) return "N/A"; // Xử lý trường hợp dữ liệu không hợp lệ
  const moneyNumber = Number(moneyString); // Chuyển đổi string thành số
  if (isNaN(moneyNumber)) return "N/A"; // Kiểm tra nếu không phải số

  return moneyNumber
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "VNĐ"); // Thay ₫ thành VNĐ nếu cần
};

