import { FinancialDataPoint } from './financial-data-point.model';

export interface CompanyFinancials {
  assets: FinancialDataPoint[];
  liabilities: FinancialDataPoint[];
  profitMargin: FinancialDataPoint[];
  salesRevenue: FinancialDataPoint[];
  grossMargin: FinancialDataPoint[];
  operatingCosts: FinancialDataPoint[];
}
