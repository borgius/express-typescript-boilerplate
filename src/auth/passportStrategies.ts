import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';

// const { JWT_SECRET } = process.env;
const JWT_SECRET = '12345';

const users = [
    {
        id: 1,
        name: 'John',
        email: 'john@mail.com',
        password: 'john123',
    },
];

// generate a jwt token for testing purposes
console.log(jwt.sign(users[0], JWT_SECRET));

// ...

const { Strategy, ExtractJwt } = passportJWT;

const params = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
console.log(params);
const strategy = new Strategy(params, (payload, done) => {
    const user = users.find(u => u.id === payload.id) || undefined;

    return done(undefined, user);
});

passport.use(strategy);
passport.initialize();

export default passport;
