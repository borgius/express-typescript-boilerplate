// values should be equal to database type values
export enum UserRole {
  Owner = 'owner',
  Admin = 'admin',
  Manager = 'manager',
  Lead = 'lead',
  Designer = 'designer',
  Tester = 'tester',
}

export interface IUser {
  role?: UserRole;
  name?: string;
  email?: string;
  managerId?: number;
  currentProjectId?: number;
  organizationId?: number;
}
