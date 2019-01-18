import * as bcrypt from 'bcryptjs';
import { IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';

import { Base } from './Base';
import { Organization } from './Organization';

@Entity('users')
@ObjectType({description: 'User object.'})
export class User extends Base {
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

    @ManyToOne(() => User, { nullable: true })
    @Field(() => User, { nullable: true, description: 'Manager of user' })
    public manager: User;

    @ManyToOne(() => Organization, { nullable: true })
    @Field(() => Organization, { nullable: true, description: 'Manager of user' })
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
