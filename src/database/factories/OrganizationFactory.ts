import { plainToClass } from 'class-transformer';
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Organization } from '../../api/models/Organization';

define(Organization, (faker: typeof Faker) => {
    return plainToClass(Organization, {
        name: faker.name.findName(),
        key: faker.random.alphaNumeric(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        zip: faker.address.zipCode(),
    });
});
