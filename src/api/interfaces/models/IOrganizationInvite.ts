export enum OrganizationInviteStatus {
  Invited = 'invited',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

export interface IOrganizationInvite {
  organizationId: number;
  userId?: number;
  userEmail: string;
  status: OrganizationInviteStatus;
}
