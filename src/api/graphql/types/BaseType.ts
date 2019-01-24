import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Base Type' })
export class BaseType {
    @Field({ description: 'Creation Date' })
    public createdAt: Date;

    @Field({ description: 'Update Date' })
    public updatedAt: Date;

    @Field({ description: 'Organization key' })
    public version: number;
}
