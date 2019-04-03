import { CompanyDetail } from './company-detail.model';
import { CompanyFinancials } from './company-financials.model';
import { KeyContacts } from './key-contacts.model';

export interface TargetCompany {
  id: number;
  status: string;
  companyDetails: CompanyDetail;
  companyFinancials: CompanyFinancials;
  keyContacts: KeyContacts[];
}
