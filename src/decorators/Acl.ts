import { Authorized } from 'type-graphql';
import { MethodAndPropDecorator } from 'type-graphql/dist/decorators/types';

import { Permission } from '../api/interfaces/acl';

export { RP } from '../auth/acl';

export function Acl({ resources, permissions }: Permission): MethodAndPropDecorator {
    return Authorized<Permission>({ resources, permissions });
}
