import { IsNotEmpty } from 'class-validator';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

@Entity()
@ObjectType({ description: 'Pet object.' })
export class Pet {

    @PrimaryColumn('uuid')
    @Field(type => ID)
    public id: string;

    @IsNotEmpty()
    @Column()
    @Field({ description: 'The name of the pet.' })
    public name: string;

    @IsNotEmpty()
    @Column()
    @Field(type => Int, { description: 'The age of the pet in years.' })
    public age: number;

    @Column({name: 'user_id', nullable: true})
    public userId: string;

    @ManyToOne(type => User, user => user.pets)
    @JoinColumn({ name: 'user_id' })
    @Field(type => User, { name: 'owner', nullable: true })
    public user: User;

    public toString(): string {
        return `${this.name}`;
    }

}
