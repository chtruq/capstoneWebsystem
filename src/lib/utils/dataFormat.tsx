export const formatDateTime = (isoDateString: string): string => {
  if (!isoDateString) return "N/A"; // Xử lý trường hợp dữ liệu không hợp lệ
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày (theo múi giờ gốc)
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng (theo múi giờ gốc)
  const year = date.getFullYear().toString(); // Lấy năm
  const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ (theo múi giờ gốc)
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút (theo múi giờ gốc)

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};



export const formatDate = (isoDateString: string): string => {
  if (!isoDateString) return "N/A"; // Xử lý trường hợp dữ liệu không hợp lệ
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và thêm 0 n
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 0
  const year = date.getFullYear().toString(); // Lấy năm

  return `${day}/${month}/${year}`;
}

export const formatMoney = (moneyString: number): string => {
  if (moneyString === 0) return "0 VND"; // Kiểm tra nếu giá trị là 0 và trả về 0 VNĐ
  if (!moneyString) return "N/A"; // Xử lý trường hợp dữ liệu không hợp lệ
  const moneyNumber = Number(moneyString); // Chuyển đổi string thành số
  if (isNaN(moneyNumber)) return "N/A"; // Kiểm tra nếu không phải số

  return moneyNumber
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "VND"); // Thay ₫ thành VNĐ nếu cần
};


export const formatDateWithoutYear = (isoDateString: string): string => {
  if (!isoDateString) return "N/A"; // Xử lý trường hợp dữ liệu không hợp lệ
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và thêm 0 n
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 0
  // const year = date.getUTCFullYear().toString(); // Lấy năm

  return `${day}/${month}`;
}


export const formatTime = (isoDateString: string): string => {
  if (!isoDateString) return "N/A"; // Xử lý trường hợp dữ liệu không hợp lệ
  const date = new Date(isoDateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export const formatMoneyShortcut = (price: number) => {
  if (price === 0) return "0 VND"; // Kiểm tra nếu giá trị là 0 và trả về 0 VNĐ
  if (price === undefined || price === null || isNaN(price)) {
    return "Đang cập nhật";
  }

  if (price >= 1000000000) {
    return (price / 1000000000).toFixed(1) + " tỷ";
  } else if (price >= 1000000) {
    return (price / 1000000).toFixed(1) + " triệu";
  } else {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
};

export const formatTextArea = (text: number | null) => {
  if (!text) return "Đang cập nhật";
  return text + "m²";
};

export const formTextNull = (text: string | number | null) => {
  if (!text) return "Đang cập nhật";
  return text;
};

export const formatDirection = (direction: string) => {
  if (direction === "Bac") return "Bắc";
  if (direction === "Nam") return "Nam";
  if (direction === "Dong") return "Đông";
  if (direction === "Tay") return "Tây";
  if (direction === "DongBac") return "Đông Bắc";
  if (direction === "TayBac") return "Tây Bắc";
  if (direction === "DongNam") return "Đông Nam";
  if (direction === "TayNam") return "Tây Nam";
  return direction;
};


export const formatRole = (role: string) => {
  console.log("Roleeeeeee", role);
  
  if (role === "admin") return "Quản trị viên";
  if (role === "Management") return "Quản lý hệ thống";
  if (role === "Staff") return "Nhân viên quản lý";
  if (role === "Seller") return "Nhân viên môi giới";
  if (role === "Project Provider") return "Nhà cung cấp";
  return role;
}

export const formatPercentage = (value: number): string => {
  if (isNaN(value)) return "N/A"; // Xử lý trường hợp giá trị không hợp lệ
  const percentage = (value * 100).toFixed(0); // Chuyển đổi sang phần trăm và làm tròn
  return `${percentage} %`;
};

export const formatCurrency = (value: number): string => {
  if (isNaN(value)) return "N/A"; // Xử lý trường hợp giá trị không hợp lệ
  return value.toLocaleString("vi-VN"); // Định dạng số theo chuẩn Việt Nam
};
