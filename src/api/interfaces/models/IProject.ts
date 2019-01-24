import { IBaseEntity } from './IBaseEntity';

export interface IProject extends IBaseEntity {
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
