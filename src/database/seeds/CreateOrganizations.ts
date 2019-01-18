import { Connection } from 'typeorm';
import { Factory, Seed, times } from 'typeorm-seeding';

import { Organization } from '../../api/models/Organization';
import { User } from '../../api/models/User';

export class CreateOrganizations implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        await times(3, async (n) => {
            const organization = await factory(Organization)().seed();
            const users = await factory(User)().makeMany(10);
            let manager: User;
            for (let user of users) {
                user.organization = organization;
                if (manager) { user.manager = manager; }
                user = await em.save(user);
                manager = manager ? manager : user;

            }
        });
    }

}
