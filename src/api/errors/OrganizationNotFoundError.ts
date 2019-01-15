import { HttpError } from 'routing-controllers';

export class OrganizationNotFoundError extends HttpError {
    constructor() {
        super(404, 'Organization not found!');
    }
}
