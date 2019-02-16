import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import Container from 'typedi';

import { AuthService } from '../auth/AuthService';
import { env } from '../env';

export const authLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp = settings.getData('express_app');
        const authService = Container.get<AuthService>(AuthService);
        expressApp.use(env.graphql.route, authService.jwtAuthenticate(user => {
            settings.setData('user', user);
        }));
    }
};
