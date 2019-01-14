import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { User } from '../models/User';
import { UserService } from '../services/UserService';

@Service()
@Resolver(of => User)
export class UserResolver {

    constructor(
        private userService: UserService
        ) {}

    @Query(returns => [User])
    public users(): Promise<any> {
      return this.userService.find();
    }
}
