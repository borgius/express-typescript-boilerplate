import { Field, InputType, Int } from 'type-graphql';

import { Organization } from '../../models/Organization';

@InputType()
export class OrganizationInput implements Partial<Organization> {

    @Field()
    public name: string;

    @Field(type => Int, {
        description: 'The age of the organization in years.',
    })
    public age: number;

}
