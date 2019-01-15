import { Connection } from 'typeorm';
import { Factory, Seed, times } from 'typeorm-seeding';

import { Organization } from '../../api/models/Organization';
import { User } from '../../api/models/User';

export class CreateOrganizations implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        await times(10, async (n) => {
            const user = await factory(User)().make();
            user.organization = await factory(Organization)().seed();
            return await em.save(user);
        });
    }

}
