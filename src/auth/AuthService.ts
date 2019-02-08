import * as express from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../api/models/User';
import { UserRepository } from '../api/repositories/UserRepository';
import { Logger, LoggerInterface } from '../decorators/Logger';
import { env } from '../env';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: UserRepository
    ) { }

    public parseBasicAuthFromRequest(req: express.Request): { username: string, password: string } {
        const authorization = req.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Credentials provided by the client');
            const decodedBase64 = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii');
            const [username, password] = decodedBase64.split(':');
            if (username && password) {
                return { username, password };
            }
        }

        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public jwtAuthenticate(cb: (user: any) => void): express.RequestHandler {
        const passportEntity = this.passportInitialize();
        return (request: express.Request, response: express.Response, next) => {
            passportEntity.authenticate('jwt', { session: false }, (err, user, info) => {
                cb(user);
                next();
            })(request, response, next);
        };
    }

    public authChecker({ root, args, context, info }: any, roles: string[]): boolean {
        return true; // or false if access denied
    }

    public async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {  email },
        });
        if (user && await user.comparePassword(password)) {
            return user;
        }
        return undefined;
    }

    public passportInitialize(): passport.PassportStatic {
        passport.use(this.passportStrategy());
        passport.initialize();
        return passport;
    }

    public passportStrategy(): passport.Strategy {
        const params = {
            secretOrKey: env.auth.jwt_secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        };
        return new Strategy(params, async (payload, done) => {
            const user = await this.validateUser(payload.email, payload.password);
            return done(undefined, user);
        });
    }

}
