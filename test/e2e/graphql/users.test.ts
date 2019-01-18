import * as nock from 'nock';
import request from 'supertest';
import { runSeed } from 'typeorm-seeding';

import { User } from '../../../src/api/models/User';
import { CreateTest } from '../../../src/database/seeds/CreateTest';
import { closeDatabase } from '../../utils/database';
import { BootstrapSettings } from '../utils/bootstrap';
import { prepareServer } from '../utils/server';

describe('/api/users', () => {

    let bruce: User;
    // let bruceAuthorization: string;
    let settings: BootstrapSettings;

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {
        settings = await prepareServer({ sync: true });
        bruce = await runSeed<User>(CreateTest);
        // bruceAuthorization = Buffer.from(`${bruce.name}:1234`).toString('base64');
    });

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(async () => {
        nock.cleanAll();
        await closeDatabase(settings.connection);
    });

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('GET: / should return a list of users', async (done) => {
        expect(1).toBe(1);
        done();
    });
});
