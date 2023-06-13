export * from "./auth";
export * from "./constants";
export * from "./cookies";
export * from "./formatCurrency";
export * from "./formatDate";
export * from "./tinyConfig";

export const graphOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};
