import * as bcrypt from 'bcryptjs';
import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';

import { IBaseEntity } from '../interfaces/models/IBaseEntity';
import { IUser, UserRole } from '../interfaces/models/IUser';
import { BaseEntity } from './BaseEntity';
import { Organization } from './Organization';

@Entity('users')
export class User extends BaseEntity implements IBaseEntity, IUser {
    public currentProjectId?: number;
    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column({ unique: true })
    public email: string;

    @Column({ nullable: true })
    public password: string;

    @ManyToOne(() => User, { nullable: true })
    public manager: User;

    @ManyToOne(() => Organization, { nullable: true })
    public organization?: Organization;

    @Column('enum', { nullable: true, enum: UserRole, array: true})
    public roles: UserRole[];

    // @OneToMany(user => Organization, organization => organization.user)
    // @Field(type => [Organization], { description: 'A list of organizations which belong to the user.' })
    // public organizations: Organization[];

    public toString(): string {
        return `${this.name} (${this.email})`;
    }

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.password = this.password ? await bcrypt.hash(this.password, 10) : undefined;
    }

    public async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

}
