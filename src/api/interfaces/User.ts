import { IBaseFields } from './baseFields';

// values should be equal to database type values
export const enum UserRole {
  Owner = 'owner',
  Admin = 'admin',
  Manager = 'manager',
  Lead = 'lead',
  Designer = 'designer',
  Tester = 'tester',
}

export interface IUser extends IBaseFields {
  role: UserRole;
  name?: string;
  email?: string;
  managerId?: number;
  currentProjectId?: number;
  organizationId?: number;
}
