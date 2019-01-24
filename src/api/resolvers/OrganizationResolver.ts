import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Context } from '../Context';
import { OrganizationService } from '../services/OrganizationService';
import { OrganizationInput } from '../types/input/OrganizationInput';
import { Organization } from '../types/Organization';

@Service()
@Resolver(() => Organization)
export class OrganizationResolver {

    constructor(
        private organizationService: OrganizationService,
        @Logger(__filename) private log: LoggerInterface    ) { }

    @Query(() => [Organization])
    public organization(@Ctx() { requestId }: Context): Promise<Organization[]> {
        this.log.info(`{${requestId}} Find all users`);
        return this.organizationService.find();
    }

    @Mutation(() => Organization)
    public async addOrganization(@Arg('organization') organization: OrganizationInput): Promise<Organization> {
        const newOrganization = new Organization();
        newOrganization.name = organization.name;
        return this.organizationService.create(newOrganization);
    }

    // @FieldResolver(returns => User)
    // public async owner(@Root() organization: Organization): Promise<User> {
    //     if (organization.userId) {
    //         return this.userLoader.load(organization.userId);
    //     }
    //     return undefined;
    //     // return this.userService.findOne(`${organization.userId}`);
    // }

    // user: createDataLoader(UserRepository),

    //     organizationsByUserIds: createDataLoader(OrganizationRepository, {
    //         method: 'findByUserIds',
    //         key: 'userId',
    //         multiple: true,
    //     }),

}
