import { IBaseFields } from './baseFields';

export interface IOrganization extends IBaseFields {
  name: string;
  key: string;
  companyUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
  address2?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
}
