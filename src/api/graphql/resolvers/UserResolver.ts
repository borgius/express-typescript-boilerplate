import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { AuthService } from '../../../auth/AuthService';
import { Acl, RP } from '../../../decorators/Acl';
import { Context } from '../../Context';
import { UserService } from '../../services/UserService';
import { User } from '../types/User';

@Service()
@Resolver(of => User)
export class UserResolver {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    @Authorized()
    @Query(returns => User)
    public async me(@Ctx() ctx: Context): Promise<User> {
        return this.userService.findOne(ctx.user.id);
    }

    @Acl(RP.user.get)
    @Query(returns => [User])
    public async users(@Ctx() ctx: Context): Promise<User[]> {
        const users: User[] = await this.userService.find();
        return users;
    }

    @Mutation(returns => String)
    public async login(
        @Arg('email') email: string,
        @Arg('password') password: string
        ): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        return `Bearer ${this.authService.generateJWT(user)}`;
    }
}
