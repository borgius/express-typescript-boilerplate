import { EntityRepository } from 'typeorm';

import { Organization } from '../models/Organization';
import { BaseRepository } from './BaseRepository';

@EntityRepository(Organization)
export class OrganizationRepository extends BaseRepository<Organization> {

    /**
     * Find by user_id is used for our data-loader to get all needed Organizations in one query.
     */
    public findByUserIds(ids: string[]): Promise<Organization[]> {
        return this.createQueryBuilder()
            .select()
            .where(`organization.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

}
