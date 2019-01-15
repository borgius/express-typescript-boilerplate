import { plainToClass } from 'class-transformer';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Organization } from '../../src/api/models/Organization';
import { OrganizationService } from '../../src/api/services/OrganizationService';
import { closeDatabase, createDatabaseConnection } from '../utils/database';
import { configureLogger } from '../utils/logger';

describe('OrganizationService', () => {

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    let connection: Connection;
    beforeAll(async () => {
        configureLogger();
        connection = await createDatabaseConnection();
    });
    beforeEach(() => connection.synchronize(true));

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(() => closeDatabase(connection));

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('should create a new organization in the database', async (done) => {
        const organization = plainToClass(Organization, {
            id: 1,
            name: 'test',
            key: 'test',
            email: 'abc@fake.com',
            address: '2222 Polk St',
            zip: '94121',
        });
        const service = Container.get<OrganizationService>(OrganizationService);
        const resultCreate = await service.create(organization);
        expect(resultCreate.name).toBe(organization.name);

        const resultFind = await service.findOne(resultCreate.id);
        if (resultFind) {
            expect(resultFind.name).toBe(organization.name);
        } else {
            fail('Could not find organization');
        }
        done();
    });

});
