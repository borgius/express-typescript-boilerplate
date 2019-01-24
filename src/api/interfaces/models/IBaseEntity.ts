export enum TableFlags {
    test = 'test',
    seed = 'seed',
}

export interface IBaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    version: number;
    flags?: TableFlags[];
}
