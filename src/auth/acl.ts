import Acl from 'acl';

// import { flatten } from 'ramda';

export const acl: Acl.Acl = new Acl(new Acl.memoryBackend());

export const ResourcesAndPermissions = {
    login: {
        asUser: {
            resources: 'login',
            permissions: 'asUser',
        },
    },
    project: {
        delete: {
            resources: 'project',
            permissions: 'delete',
        },
        create: {
            resources: 'project',
            permissions: 'create',
        },
        getAssociatedProjects: {
            resources: 'project',
            permissions: 'getAssociatedProjects',
        },
        get: {
            resources: 'project',
            permissions: 'get',
        },
        getRepositoryName: {
            resources: 'project',
            permissions: 'getRepositoryName',
        },
        update: {
            resources: 'project',
            permissions: 'update',
        },
        updateEnvironments: {
            resources: 'project',
            permissions: 'updateEnvironments',
        },
        updateProviders: {
            resources: 'project',
            permissions: 'updateProviders',
        },
        updateSecrets: {
            resources: 'project',
            permissions: 'updateSecrets',
        },
        createSSHKey: {
            resources: 'project',
            permissions: 'createSSHKey',
        },
        getOrganizationProjects: {
            resources: 'project',
            permissions: 'getOrganizationProjects',
        },
    },
    organization: {
        update: {
            resources: 'organization',
            permissions: 'update',
        },
        updateMemberType: {
            resources: 'organization',
            permissions: 'updateMemberType',
        },
        list: {
            resources: 'organization',
            permissions: 'list',
        },
        create: {
            resources: 'organization',
            permissions: 'create',
        },
        get: {
            resources: 'organization',
            permissions: 'get',
        },
        inviteMember: {
            resources: 'organization',
            permissions: 'inviteMember',
        },
        removeMember: {
            resources: 'organization',
            permissions: 'removeMember',
        },
    },
    feature: {
        createForProject: {
            resources: 'feature',
            permissions: 'createForProject',
        },
        get: {
            resources: 'feature',
            permissions: 'get',
        },
        getForProjectId: {
            resources: 'feature',
            permissions: 'getForProjectId',
        },
        updateAssociatedUsers: {
            resources: 'feature',
            permissions: 'updateAssociatedUsers',
        },
        update: {
            resources: 'feature',
            permissions: 'update',
        },
    },
    milestone: {
        createForProject: {
            resources: 'milestone',
            permissions: 'createForProject',
        },
        get: {
            resources: 'milestone',
            permissions: 'get',
        },
        getForProjectId: {
            resources: 'milestone',
            permissions: 'getForProjectId',
        },
        update: {
            resources: 'milestone',
            permissions: 'update',
        },
    },
    suite: {
        getForProjectId: {
            resources: 'suite',
            permissions: 'getForProjectId',
        },
        get: {
            resources: 'suite',
            permissions: 'get',
        },
        createForProjectId: {
            resources: 'suite',
            permissions: 'createForProjectId',
        },
        update: {
            resources: 'suite',
            permissions: 'update',
        },
    },
    scenario: {
        get: {
            resources: 'scenario',
            permissions: 'get',
        },
        getForIds: {
            resources: 'scenario',
            permissions: 'getForIds',
        },
        createForFeature: {
            resources: 'scenario',
            permissions: 'createForFeature',
        },
        getForFeatureId: {
            resources: 'scenario',
            permissions: 'getForFeatureId',
        },
        updateAssociatedUsers: {
            resources: 'scenario',
            permissions: 'updateAssociatedUsers',
        },
        update: {
            resources: 'scenario',
            permissions: 'update',
        },
    },
    build: {
        getForProjectId: {
            resources: 'build',
            permissions: 'getForProjectId',
        },
    },
    session: {
        logout: {
            resources: 'session',
            permissions: 'logout',
        },
    },
    featureComment: {
        getForFeatureId: {
            resources: 'featureComment',
            permissions: 'getForFeatureId',
        },
        getForScenarioId: {
            resources: 'featureComment',
            permissions: 'getForScenarioId',
        },
        create: {
            resources: 'featureComment',
            permissions: 'create',
        },
        update: {
            resources: 'featureComment',
            permissions: 'update',
        },
        delete: {
            resources: 'featureComment',
            permissions: 'delete',
        },
    },
    scenarioComment: {
        getForFeatureId: {
            resources: 'scenarioComment',
            permissions: 'getForFeatureId',
        },
        getForScenarioId: {
            resources: 'scenarioComment',
            permissions: 'getForScenarioId',
        },
        create: {
            resources: 'scenarioComment',
            permissions: 'create',
        },
        update: {
            resources: 'scenarioComment',
            permissions: 'update',
        },
        delete: {
            resources: 'scenarioComment',
            permissions: 'delete',
        },
    },
    task: {
        get: {
            resources: 'task',
            permissions: 'get',
        },
        getForScenarioId: {
            resources: 'task',
            permissions: 'getForScenarioId',
        },
        updateAssociatedUsers: {
            resources: 'task',
            permissions: 'updateAssociatedUsers',
        },
        create: {
            resources: 'task',
            permissions: 'create',
        },
    },
    user: {
        get: {
            resources: 'user',
            permissions: 'get',
        },
        getAssociatedUsersForFeatureId: {
            resources: 'user',
            permissions: 'getAssociatedUsersForFeatureId',
        },
        getAssociatedUsersForScenarioId: {
            resources: 'user',
            permissions: 'getAssociatedUsersForScenarioId',
        },
        getAssociatedUsersForProjectId: {
            resources: 'user',
            permissions: 'getAssociatedUsersForProjectId',
        },
        getAssociatedUsersForTaskId: {
            resources: 'user',
            permissions: 'getAssociatedUsersForTaskId',
        },
        selectCurrentProject: {
            resources: 'user',
            permissions: 'selectCurrentProject',
        },
    },
    scenarioFilter: {
        create: {
            resources: 'scenarioFilter',
            permissions: 'create',
        },
        get: {
            resources: 'scenarioFilter',
            permissions: 'get',
        },
    },
    organization_invite: {
        get: {
            resources: 'organization_invite',
            permissions: 'get',
        },
        accept: {
            resources: 'organization_invite',
            permissions: 'accept',
        },
        remove: {
            resources: 'organization_invite',
            permissions: 'remove',
        },
    },
    suiteRun: {
        get: {
            resources: 'suiteRun',
            permissions: 'get',
        },
        create: {
            resources: 'suiteRun',
            permissions: 'create',
        },
        update: {
            resources: 'suiteRun',
            permissions: 'update',
        },
    },
    scenarioRun: {
        get: {
            resources: 'scenarioRun',
            permissions: 'get',
        },
        create: {
            resources: 'scenarioRun',
            permissions: 'create',
        },
        update: {
            resources: 'scenarioRun',
            permissions: 'update',
        },
    },
    label: {
        get: {
            resources: 'label',
            permissions: 'get',
        },
        delete: {
            resources: 'label',
            permissions: 'delete',
        },
        update: {
            resources: 'label',
            permissions: 'update',
        },
    },
};

export const RP = ResourcesAndPermissions;

const rules = [
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
];

/*const RP = {};
for (const role of rules) {
    for (const allows of role.allows) {
        for (const resource of flatten([allows.resources])) {
            if (RP[resource] === undefined) {
                RP[resource] = {};
            }
            for (const permission of flatten([allows.permissions])) {
                RP[resource][permission] = { resource, permission };
            }
        }
    }
}
console.log(RP);
*/

acl.allow(rules);

acl.addUserRoles('owner', 'owner');
acl.addUserRoles('admin', 'admin');
acl.addUserRoles('manager', 'manager');
acl.addUserRoles('lead', 'lead');
acl.addUserRoles('designer', 'designer');
acl.addUserRoles('tester', 'tester');
acl.addUserRoles('unauthorized', 'unauthorized');

acl.addRoleParents('owner', 'admin');
acl.addRoleParents('admin', 'manager');
acl.addRoleParents('manager', 'lead');
acl.addRoleParents('lead', 'designer');
acl.addRoleParents('designer', 'tester');
acl.isAllowed('a', 'b', 'c');
