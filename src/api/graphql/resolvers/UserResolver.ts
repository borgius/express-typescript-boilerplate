import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

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

    @Query(returns => [User])
    public async users(params: any = undefined): Promise<User[]> {
        const users: User[] = await this.userService.find();
        return users;
    }
}
