import { EntityRepository } from 'typeorm';

import { User } from '../models/User';
import { BaseRepository } from './BaseRepository';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User>  {

}
