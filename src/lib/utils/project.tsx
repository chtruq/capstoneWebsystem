export const tableText = (text: string | number | null) => {
  if (!text) return "Đang cập nhật";

  return text;
};

export const TextPrice = (price: number) => {
  if (price === undefined || price === null || isNaN(price)) {
    return "Đang cập nhật";
  }

  if (price >= 1000000000) {
    return (price / 1000000000).toFixed(0) + " tỷ";
  } else if (price >= 1000000) {
    return (price / 1000000).toFixed(0) + " triệu";
  } else {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
};

export const TextArea = (text: number | null) => {
  if (!text) return "Đang cập nhật";

  return text + "m²";
};
