import { IsEmail, IsNotEmpty, IsNumberString, IsPhoneNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IBaseEntity } from '../interfaces/models/IBaseEntity';
import { IOrganization } from '../interfaces/models/IOrganization';
import { BaseEntity } from './BaseEntity';

@Entity('organizations')
export class Organization extends BaseEntity implements IBaseEntity, IOrganization {

    @PrimaryGeneratedColumn({ type: 'bigint'})
    public id: number;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public key: string;

    @Column({ nullable: true })
    public url?: string;

    @IsPhoneNumber('ZZ')
    @Column({ nullable: true })
    public phone?: string;

    @IsEmail()
    @Column()
    public email: string;

    @IsNotEmpty()
    @Column()
    public address: string;

    @Column({ nullable: true })
    public address2?: string;

    @IsNumberString()
    @Column()
    public zip?: string;

    @Column({ nullable: true })
    public city?: string;

    @Column({ nullable: true })
    public state?: string;

    public toString(): string {
        return `${this.name}`;
    }

}
