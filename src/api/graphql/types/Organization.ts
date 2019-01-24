import { Field, ID, ObjectType } from 'type-graphql';

// import { TableFlags } from '../interfaces/models/IBaseEntity';
import { IOrganization } from '../../interfaces/models/IOrganization';
import { TableFlags } from '../../interfaces/models/TableFlags';

// import { BaseType } from './BaseType';

@ObjectType({ description: 'Organization' })
export class Organization implements IOrganization {
    @Field(() => ID)
    public id: number;

    @Field({ description: 'The name of the Organization' })
    public name: string;

    @Field({ description: 'Organization key' })
    public key: string;

    @Field({ description: 'Company Url' })
    public companyUrl?: string;

    @Field({ description: 'Phone number' })
    public phone?: string;

    @Field({ description: 'Company Email' })
    public email: string;

    @Field({ description: 'Address' })
    public address: string;

    @Field({ description: 'Address2' })
    public address2?: string;

    public country?: string;

    @Field({ description: 'State' })
    public state?: string;

    @Field({ description: 'City' })
    public city?: string;

    @Field({ description: 'zip' })
    public zip?: string;

    public flags?: TableFlags[];
}
