import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { OrganizationNotFoundError } from '../errors/OrganizationNotFoundError';
import { Organization } from '../models/Organization';
import { OrganizationService } from '../services/OrganizationService';

@Authorized()
@JsonController('/organizations')
export class OrganizationController {

    constructor(
        private organizationService: OrganizationService
    ) { }

    @Get()
    public find(): Promise<Organization[]> {
        return this.organizationService.find();
    }

    @Get('/:id')
    @OnUndefined(OrganizationNotFoundError)
    public one(@Param('id') id: number): Promise<Organization | undefined> {
        return this.organizationService.findOne(id);
    }

    @Post()
    public create(@Body() organization: Organization): Promise<Organization> {
        return this.organizationService.create(organization);
    }

    @Put('/:id')
    public update(@Param('id') id: number, @Body() organization: Organization): Promise<Organization> {
        return this.organizationService.update(id, organization);
    }

    @Delete('/:id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.organizationService.delete(id);
    }

}
