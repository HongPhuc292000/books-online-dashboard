export const formatVND = (value: number) => {
  return value.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
};
