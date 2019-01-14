import DataLoader from 'dataloader';
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Context } from '../Context';
import { Pet } from '../models/Pet';
import { User as User } from '../models/User';
import { PetService } from '../services/PetService';
import { PetInput } from '../types/input/PetInput';

@Service()
@Resolver(of => Pet)
export class PetResolver {

    constructor(
        private petService: PetService,
        @Logger(__filename) private log: LoggerInterface,
        @DLoader(User) private userLoader: DataLoader<string, User>
    ) { }

    @Query(returns => [Pet])
    public pets(@Ctx() { requestId }: Context): Promise<Pet[]> {
        this.log.info(`{${requestId}} Find all users`);
        return this.petService.find();
    }

    @Mutation(returns => Pet)
    public async addPet(@Arg('pet') pet: PetInput): Promise<Pet> {
        const newPet = new Pet();
        newPet.name = pet.name;
        newPet.age = pet.age;
        return this.petService.create(newPet);
    }

    @FieldResolver(returns => User)
    public async owner(@Root() pet: Pet): Promise<User> {
        if (pet.userId) {
            return this.userLoader.load(pet.userId);
        }
        return undefined;
        // return this.userService.findOne(`${pet.userId}`);
    }

    // user: createDataLoader(UserRepository),

    //     petsByUserIds: createDataLoader(PetRepository, {
    //         method: 'findByUserIds',
    //         key: 'userId',
    //         multiple: true,
    //     }),

}
