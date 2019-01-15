import { IsEmail, IsNotEmpty, IsNumberString, IsPhoneNumber } from 'class-validator';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Organization' })
export class Organization {

    @PrimaryGeneratedColumn({ type: 'bigint'})
    @Field(() => ID)
    public id: number;

    @IsNotEmpty()
    @Column()
    @Field({ description: 'The name of the Organization' })
    public name: string;

    @IsNotEmpty()
    @Column()
    @Field({ description: 'The key of the Organization.' })
    public key: string;

    @Column({ nullable: true })
    @Field({ description: 'Company Url' })
    public url?: string;

    @IsPhoneNumber('ZZ')
    @Column({ nullable: true })
    @Field(() => Int, { description: 'Phone number' })
    public phone: number;

    @IsEmail()
    @Column()
    @Field({ description: 'Company Email' })
    public email: string;

    @IsNotEmpty()
    @Column()
    @Field({ description: 'Address' })
    public address: string;

    @Column({ nullable: true })
    @Field({ description: 'Address2' })
    public address2?: string;

    @IsNumberString()
    @Column()
    @Field({ description: 'zip' })
    public zip: string;

    @Column({ nullable: true })
    @Field({ description: 'City' })
    public city?: string;

    @Column({ nullable: true })
    @Field({ description: 'State' })
    public state?: string;

    public toString(): string {
        return `${this.name}`;
    }

}
