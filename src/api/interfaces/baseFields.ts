export enum TableFlags {
    test = 'test',
    seed = 'seed',
}

export interface IBaseFields {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    version: number;
    flags: TableFlags[];
}
