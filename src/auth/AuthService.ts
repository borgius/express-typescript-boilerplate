import * as express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { pick } from 'ramda';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Permission } from '../api/interfaces/acl';
import { User } from '../api/models/User';
import { UserRepository } from '../api/repositories/UserRepository';
import { Logger, LoggerInterface } from '../decorators/Logger';
import { env } from '../env';
import { acl } from './acl';

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

    public async authChecker({ context: { user } }: any, perms: Permission[] | any): Promise<boolean> {
        const isAuthenticated = user && !!user.id;
        let isAllowed = false || perms.length === 0;
        if (isAuthenticated && perms && user.roles) {
            for (const userRole of user.roles) {
                for (const perm of perms) {
                    isAllowed = isAllowed || await acl.isAllowed(userRole, perm.resources, perm.permissions);
                }
            }
        }
        return isAuthenticated && isAllowed;
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

    public generateJWT(user: User): string {
        return jwt.sign(pick(['id', 'email', 'roles'], user), env.auth.jwt_secret);
    }

    public jwtAuthenticate(cb: (user: any) => void): express.RequestHandler {
        const passportEntity = this.passportInitialize();
        return (request: express.Request, response: express.Response, next) => {
            passportEntity.authenticate('jwt', { session: false }, (err, user) => {
                cb(user);
                next();
            })(request, response, next);
        };
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
            // let user: User;
            // if (payload.id && payload.email) {
            //     user = await this.userRepository.findOne({
            //         select: ['id', 'email', 'roles'],
            //         where: { id: payload.id, email: payload.email },
            //     });
            // }
            return done(undefined, payload as User);
        });
    }

}
