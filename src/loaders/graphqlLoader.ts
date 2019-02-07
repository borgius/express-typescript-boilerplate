import * as express from 'express';
import GraphQLHTTP from 'express-graphql';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as path from 'path';
import { AuthChecker, buildSchema } from 'type-graphql';
import Container from 'typedi';

import passport from '../auth/passportStrategies';
import { env } from '../env';
import { getErrorCode, getErrorMessage, handlingErrors } from '../lib/graphql';

export const graphqlLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.graphql.enabled) {

        const customAuthChecker: AuthChecker =
        ({ root, args, context, info }, roles) => {
            return true; // or false if access denied
        };

        const schema = await buildSchema({
            resolvers: env.app.dirs.resolvers,
            authChecker: customAuthChecker,
            // automatically create `schema.gql` file with schema definition in current folder
            emitSchemaFile: path.resolve(__dirname, '../api', 'schema.gql'),
        });

        const expressApp = settings.getData('express_app');
        handlingErrors(schema);

        let authUser;
        expressApp.use(env.graphql.route, (request: express.Request, response: express.Response, next) => {
            // console.log(request);
            passport.authenticate('jwt', { session: false }, (err, user, info) => {
                console.log(err, user, info);
                if (user) {
                    authUser = user;
                }
                next();
            })(request, response, next);
        });

        // Add graphql layer to the express app
        expressApp.use(env.graphql.route, (request: express.Request, response: express.Response) => {
            // Build GraphQLContext
            const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // uuid-like
            const container = Container.of(requestId); // get scoped container
            const context = { requestId, container, request, response, user: authUser }; // create our context

            container.set('context', context); // place context or other data in container

            // Setup GraphQL Server
            GraphQLHTTP({
                schema,
                context,
                graphiql: env.graphql.editor,
                formatError: error => ({
                    code: getErrorCode(error.message),
                    message: getErrorMessage(error.message),
                    path: error.path,
                }),
            })(request, response);
        });

    }
};
