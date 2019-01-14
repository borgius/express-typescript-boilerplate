import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Pet } from './Pet';

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
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }

    @PrimaryColumn('uuid')
    @Field(type => ID)
    public id: string;

    @IsNotEmpty()
    @Column({ name: 'first_name' })
    @Field({ description: 'The first name of the user.' })
    public firstName: string;

    @IsNotEmpty()
    @Column({ name: 'last_name' })
    @Field({ description: 'The last name of the user.' })
    public lastName: string;

    @IsNotEmpty()
    @Column()
    @Field({ description: 'The email of the user.' })
    public email: string;

    @IsNotEmpty()
    @Column()
    @Exclude()
    public password: string;

    @IsNotEmpty()
    @Column()
    public username: string;

    @OneToMany(type => Pet, pet => pet.user)
    @Field(type => [Pet], { description: 'A list of pets which belong to the user.' })
    public pets: Pet[];

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.password = await User.hashPassword(this.password);
    }

}
