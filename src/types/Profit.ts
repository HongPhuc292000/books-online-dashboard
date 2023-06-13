export interface ProfitPerMonthQueries {
  month?: number;
  year?: number;
}

export interface ProfitPerYearQueries {
  year?: string;
}

export interface ProfitPerMonthOrYear {
  totalSalesFigures: number;
  orderCreated: number;
  successOrder: number;
  processingOrder: number;
  cancelOrder: number;
}

export interface ProfitEachMonthQueries {
  startMonth?: number;
  endMonth?: number;
  year?: number;
}

export interface ProfitEachYearQueries {
  startYear?: number;
  endYear?: number;
}

export interface ProfitEachMonth {
  id: number;
  month: string;
  createdOrder: number;
  successOrder: number;
}

export interface ProfitEachYear {
  id: number;
  year: number;
  createdOrder: number;
  successOrder: number;
}

export interface ColumnGraphData {
  label: string;
  data: number[];
  backgroundColor: string;
}

export interface GraphData {
  labels: string[];
  datasets: ColumnGraphData[];
}
