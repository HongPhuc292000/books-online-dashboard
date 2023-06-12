export const formatVND = (value?: number) => {
  const defaulValue = value ? value : 0;
  return defaulValue.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
};
