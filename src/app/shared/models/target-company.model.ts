import { CompanyDetail } from './company-detail.model';
import { CompanyFinancials } from './company-financials.model';
import { KeyContacts } from './key-contacts.model';

export interface TargetCompany {
  Status: string;
  CompanyDetails: CompanyDetail
  CompanyFinancials: CompanyFinancials;
  KeyContacts: KeyContacts[];
}
