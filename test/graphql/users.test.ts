import jwt from 'jsonwebtoken';
import request from 'supertest';
import { runSeed } from 'typeorm-seeding';

import { User } from '../../src/api/models/User';
import { CreateTest } from '../../src/database/seeds/CreateTest';
import { env } from '../../src/env';
import { BootstrapSettings } from '../utils/bootstrap';
import { closeDatabase } from '../utils/database';
import { prepareServer } from '../utils/server';

describe('GraphQL: type Users', () => {

    const testUsers = [
        {
            id: 1,
            name: 'John',
            email: 'john@mail.com',
            password: 'john123',
        },
    ];

    let user: User;
    let token: string;
    // let bruceAuthorization: string;
    let settings: BootstrapSettings;

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {
        settings = await prepareServer({ sync: true });
        user = await runSeed<User>(CreateTest);
        token = jwt.sign(testUsers[0], env.auth.jwt_secret);
        console.log('test token', token, user);
    }, 100000000);

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(async () => {
        // nock.cleanAll();
        await closeDatabase(settings.connection);
    });

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('"users" should return a list of users', async (done) => {
        await request(settings.app)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({ query: `
                query GetUser {
                    users {
                        id
                        organization {
                            id
                            name
                            address
                        }
                        manager {
                            id
                            name
                        }
                    }
                    }`,
                })
            .expect(200)
            .expect( ({ body: { data }}) => {
                expect(data.users)
                .toBeArray()
                .toSatisfy(users => users.length > 0);
            });
        done();
    });
});
