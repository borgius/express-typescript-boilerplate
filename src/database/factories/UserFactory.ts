import { plainToClass } from 'class-transformer';
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { User } from '../../../src/api/models/User';

define(User, (faker: typeof Faker, settings: { role: string }) => {
    return plainToClass(User, {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '1234',
    });
});
