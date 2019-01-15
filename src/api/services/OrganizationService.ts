import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Organization } from '../models/Organization';
import { User } from '../models/User';
import { OrganizationRepository } from '../repositories/OrganizationRepository';
import { events } from '../subscribers/events';

@Service()
export class OrganizationService {

    constructor(
        @OrmRepository() private organizationRepository: OrganizationRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Organization[]> {
        this.log.info('Find all Organizations');
        return this.organizationRepository.find();
    }

    public findByUser(user: User): Promise<Organization[]> {
        this.log.info('Find all Organizations of the user', user.toString());
        return this.organizationRepository.find({
            where: {
                userId: user.id,
            },
        });
    }

    public findOne(id: number): Promise<Organization | undefined> {
        this.log.info('Find all Organizations');
        return this.organizationRepository.findOne({ id });
    }

    public async create(organization: Organization): Promise<Organization> {
        this.log.info('Create a new Organization => ', Organization.toString());
        const newOrganization = await this.organizationRepository.save(organization);
        this.eventDispatcher.dispatch(events.organization.created, newOrganization);
        return newOrganization;
    }

    public update(id: number, organization: Organization): Promise<Organization> {
        this.log.info('Update a Organization');
        organization.id = id;
        return this.organizationRepository.save(organization);
    }

    public async delete(id: number): Promise<void> {
        this.log.info('Delete a Organization');
        await this.organizationRepository.delete(id);
        return;
    }

}
