import {
    Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn
} from 'typeorm';

import { TableFlags } from '../interfaces/models/TableFlags';

export class BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @VersionColumn()
    public version: number;

    @Column({
        type: 'enum',
        enum: TableFlags,
        array: true,
        nullable: true,
    })
    public flags?: TableFlags[];
}
