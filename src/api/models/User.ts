import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { use } from 'typescript-mix';

import { Flag } from './mixins/Flag';
import { Organization } from './Organization';

@Entity()
@ObjectType({description: 'User object.'})
export class User {

    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(user: User, password: string): Promise<boolean> {
        return new Promise((resolve) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }

    @PrimaryGeneratedColumn({ type: 'bigint' })
    @Field(type => ID)
    public id: number;

    @IsNotEmpty()
    @Column()
    @Field({ description: 'The name of the user.' })
    public name: string;

    @IsNotEmpty()
    @Column({ unique: true })
    @Field({ description: 'The email of the user.' })
    public email: string;

    @IsNotEmpty()
    @Column()
    @Exclude()
    public password: string;

    @ManyToOne(type => User, { nullable: true })
    @Field(type => User, { description: 'Manager of user' })
    public manager: User;

    @ManyToOne(type => Organization, { nullable: true })
    @Field(type => Organization, { description: 'Manager of user' })
    public organization: Organization;

    // @OneToMany(user => Organization, organization => organization.user)
    // @Field(type => [Organization], { description: 'A list of organizations which belong to the user.' })
    // public organizations: Organization[];

    public toString(): string {
        return `${this.name} (${this.email})`;
    }

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.password = await User.hashPassword(this.password);
    }

}
