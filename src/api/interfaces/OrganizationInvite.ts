import { IBaseFields } from './baseFields';

export enum OrganizationInviteStatus {
  Invited = 'invited',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

export interface IOrganizationInvite extends IBaseFields {
  organizationId: number;
  userId?: number;
  userEmail: string;
  status: OrganizationInviteStatus;
  createdAt: Date;
  updatedAt: Date;

}
