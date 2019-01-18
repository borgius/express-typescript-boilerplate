import * as bcrypt from 'bcryptjs';
import { IsNotEmpty } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import {
    BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';

import { Organization } from './Organization';

@Entity('users')
@ObjectType({description: 'User object.'})
export class User {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    @Field(type => ID)
    public id: number;

    @CreateDateColumn()
    @IsNotEmpty()
    @Column()
    @Field({ description: 'The name of the user.' })
    public name: string;

    @IsNotEmpty()
    @Column({ unique: true })
    @Field({ nullable: true, description: 'The email of the user.' })
    public email: string;

    @Column({ nullable: true })
    public password: string;

    @ManyToOne(type => User, { nullable: true })
    @Field(type => User, { nullable: true, description: 'Manager of user' })
    public manager: User;

    @ManyToOne(type => Organization, { nullable: true })
    @Field(type => Organization, { nullable: true, description: 'Manager of user' })
    public organization?: Organization;

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
