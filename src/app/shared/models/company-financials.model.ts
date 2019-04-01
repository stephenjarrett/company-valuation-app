import { FinancialDataPoint } from './financial-data-point.model';

export interface CompanyFinancials {
  Assets: FinancialDataPoint[];
  Liabilities: FinancialDataPoint[];
  ProfitMargin: FinancialDataPoint[];
  SalesRevenue: FinancialDataPoint[];
  GrossMargin: FinancialDataPoint[];
  OperatingCosts: FinancialDataPoint[];
}
