import Acl from 'acl';

const aclRules: Acl.Acl = new Acl(new Acl.memoryBackend());

aclRules.allow([
    {
        roles: 'admin',
        allows: [
            {
                resources: 'login',
                permissions: 'asUser',
            },
            {
                resources: 'project',
                permissions: 'delete',
            },
            {
                resources: 'organization',
                permissions: ['update', 'updateMemberType', 'list'],
            },
        ],
    },
    {
        roles: 'lead',
        allows: [
            {
                resources: 'feature',
                permissions: [
                    'createForProject',
                    'get',
                    'getForProjectId',
                    'updateAssociatedUsers',
                    'update',
                ],
            },
            {
                resources: 'milestone',
                permissions: ['createForProject', 'get', 'getForProjectId', 'update'],
            },
            {
                resources: 'suite',
                permissions: [
                    'getForProjectId',
                    'get',
                    'createForProjectId',
                    'update',
                ],
            },
            {
                resources: 'scenario',
                permissions: [
                    'get',
                    'getForIds',
                    'createForFeature',
                    'getForFeatureId',
                    'updateAssociatedUsers',
                    'update',
                ],
            },
            {
                resources: 'project',
                permissions: [
                    'create',
                    'getAssociatedProjects',
                    'get',
                    'getRepositoryName',
                    'update',
                    'updateEnvironments',
                    'updateProviders',
                    'updateSecrets',
                    'createSSHKey',
                ],
            },
            {
                resources: 'organization',
                permissions: [
                    'create',
                ],
            },
        ],
    },
    {
        roles: 'tester',
        allows: [
            {
                resources: 'build',
                permissions: 'getForProjectId',
            },
            {
                resources: 'session',
                permissions: 'logout',
            },
            {
                resources: ['featureComment', 'scenarioComment'],
                permissions: [
                    'getForFeatureId',
                    'getForScenarioId',
                    'create',
                    'update',
                    'delete',
                ],
            },
            {
                resources: 'task',
                permissions: [
                    'get',
                    'getForScenarioId',
                    'updateAssociatedUsers',
                    'create',
                ],
            },
            {
                resources: 'user',
                permissions: [
                    'get',
                    'getAssociatedUsersForFeatureId',
                    'getAssociatedUsersForScenarioId',
                    'getAssociatedUsersForProjectId',
                    'getAssociatedUsersForTaskId',
                    'selectCurrentProject',
                ],
            },
            {
                resources: 'scenarioFilter',
                permissions: ['create', 'get'],
            },
            {
                resources: 'organization',
                permissions: ['get', 'inviteMember', 'removeMember'],
            },
            {
                resources: 'organization_invite',
                permissions: ['get', 'accept', 'remove'],
            },
            {
                resources: 'feature',
                permissions: ['get', 'getForProjectId'],
            },
            {
                resources: 'milestone',
                permissions: ['get', 'getForProjectId'],
            },
            {
                resources: 'suite',
                permissions: ['getForProjectId', 'get'],
            },
            {
                resources: 'project',
                permissions: [
                    'getAssociatedProjects',
                    'get',
                    'getRepositoryName',
                    'getOrganizationProjects',
                ],
            },
            {
                resources: 'scenario',
                permissions: [
                    'get',
                    'getForIds',
                    'getForFeatureId',
                    'updateAssociatedUsers',
                ],
            },
            {
                resources: 'suiteRun',
                permissions: ['get', 'create', 'update'],
            },
            {
                resources: 'scenarioRun',
                permissions: ['get', 'create', 'update'],
            },
            {
                resources: 'label',
                permissions: ['get', 'delete', 'update'],
            },
        ],
    },
]);

// acl.allow('unauthorized', '', '');

aclRules.addUserRoles('owner', 'owner');
aclRules.addUserRoles('admin', 'admin');
aclRules.addUserRoles('manager', 'manager');
aclRules.addUserRoles('lead', 'lead');
aclRules.addUserRoles('designer', 'designer');
aclRules.addUserRoles('tester', 'tester');
aclRules.addUserRoles('unauthorized', 'unauthorized');

aclRules.addRoleParents('owner', 'admin');
aclRules.addRoleParents('admin', 'manager');
aclRules.addRoleParents('manager', 'lead');
aclRules.addRoleParents('lead', 'designer');
aclRules.addRoleParents('designer', 'tester');
aclRules.isAllowed('a', 'b', 'c');
export default aclRules;
