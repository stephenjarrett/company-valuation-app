import { FinancialDataPoint } from './financial-data-point.model';

export class CompanyFinancials {
  assets: FinancialDataPoint[];
  liabilities: FinancialDataPoint[];
  profitMargin: FinancialDataPoint[];
  salesRevenue: FinancialDataPoint[];
  operatingCosts: FinancialDataPoint[];
}
