import { plainToClass } from 'class-transformer';
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { IBaseEntity } from '../../api/interfaces/models/IBaseEntity';
import { IOrganization } from '../../api/interfaces/models/IOrganization';
import { Organization } from '../../api/models/Organization';

define(Organization, (faker: typeof Faker) => {
    return plainToClass<Organization, IOrganization|IBaseEntity>(Organization, {
        name: faker.company.companyName(),
        key: faker.random.alphaNumeric(10),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        url: faker.internet.url(),
        address: faker.address.streetAddress(),
        zip: faker.address.zipCode(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        flags: '{seed}',
    });
});
