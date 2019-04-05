import { KeyContact } from './key-contact.model';
import { CompanyDetail } from './company-detail.model';
import { CompanyFinancials } from './company-financials.model';

export class TargetCompany {
  id: number;
  status: string;
  companyDetails: CompanyDetail;
  companyFinancials: CompanyFinancials;
  keyContact: KeyContact;
}
