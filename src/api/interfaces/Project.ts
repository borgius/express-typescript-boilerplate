import { IBaseFields } from './baseFields';

export interface IProject extends IBaseFields {
  name: string;
  key: string;
  description: string;
  allowRecord: boolean;
  baseUrl: string;
  maxConcurrent: number;
  ownerId: number;
  managerId?: number;
  updatedAt: Date;
  providers: object;
  environments: object;
  secrets: object;
  sshKeys: object[];
  deleted?: boolean;
  // synchonizer
  githubHookId?: number;
  synchronizedAt?: Date;
}
