import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Context } from '../../Context';
// import { User as MUser } from '../models/User';
import { UserService } from '../../services/UserService';
// import { GOrganization } from '../types/Organization';
import { User } from '../types/User';

@Service()
@Resolver(of => User)
export class UserResolver {

    constructor(
        private userService: UserService
        ) {}

    @Authorized('ADMIN', 'MODERATOR')
    @Query(returns => [User])
    public async users(@Ctx() ctx: Context): Promise<User[]> {
        const users: User[] = await this.userService.find();
        return users;
    }
}
