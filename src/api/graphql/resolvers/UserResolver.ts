import { Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { AuthService } from '../../../auth/AuthService';
import { Context } from '../../Context';
// import { User as MUser } from '../models/User';
import { UserService } from '../../services/UserService';
// import { GOrganization } from '../types/Organization';
import { User } from '../types/User';

@Service()
@Resolver(of => User)
export class UserResolver {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    @Authorized('ADMIN', 'MODERATOR')
    @Query(returns => [User])
    public async users(@Ctx() ctx: Context): Promise<User[]> {
        const users: User[] = await this.userService.find();
        return users;
    }

    @Mutation(returns => User)
    public async login(email: string, password: string): Promise<any> {
        return this.authService.validateUser(email, password);
    }

}
