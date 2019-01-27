import { TableFlags } from './TableFlags';

export interface IBaseEntity {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
    flags?: TableFlags[];
}
