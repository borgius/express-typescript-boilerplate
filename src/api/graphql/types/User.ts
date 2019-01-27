import { Field, ID, ObjectType } from 'type-graphql';

import { IUser, UserRole } from '../../interfaces/models/IUser';
// import { BaseType } from './BaseType';
// import { User as MUser } from '../../models/User';
import { Organization } from './Organization';

@ObjectType({description: 'User object.'})
export class User implements IUser {

    @Field(() => ID)
    public id: number;

    public createdAt?: Date;
    public updatedAt?: Date;
    public version?: number;

    public currentProjectId?: number;
    @Field({ description: 'The name of the user.' })
    public name: string;

    @Field({ nullable: true, description: 'The email of the user.' })
    public email: string;

    @Field(() => User, { nullable: true, description: 'Manager of user' })
    public manager: User;

    @Field(() => Organization, { nullable: true, description: 'Organization' })
    public organization?: Organization;

    public role: UserRole;
    // @OneToMany(user => Organization, organization => organization.user)
    // @Field(type => [Organization], { description: 'A list of organizations which belong to the user.' })
    // public organizations: Organization[];
}
