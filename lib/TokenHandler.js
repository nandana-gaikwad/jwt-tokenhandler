const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const constants = require('./constants/jwt');

const client = jwksClient({
    rateLimit: true,
    cacheMaxAge: constants.CACHE_MAX_AGE,
    jwksUri: `https://${constants.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header, cb) => {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) return cb(err);
        const signingKey = key.publicKey || key.rsaPublicKey;
        cb(null, signingKey);
    });
};

class TokenHandler {
    //To check if the token is bearer or not
    isBearerToken = (token) => {
        const bearerToken = token.split(' ');
        if (bearerToken && bearerToken[0] === 'Bearer' && bearerToken[1])
            return bearerToken[1];
        return false;
    };

    //verify and decode token
    verifyAndDecodeToken = async (token) => {
        if (token) {
            const result = new Promise((resolve, reject) => {
                jwt.verify(
                    token,
                    getKey,
                    {
                        issuer: `https://${constants.AUTH0_DOMAIN}/`,
                        algorithms: constants.AUTH0_ALGORITHMS,
                        audience: constants.VALID_JWT_AUDS
                    },
                    (error, decoded) => {
                        if (error)
                            reject(error);

                        if (decoded) {
                            if (!decoded.exp || !decoded.iat) return reject(
                                new Error('Token had no \'exp\' or \'iat\' payload'),
                            );
                            resolve(decoded);
                        }
                    }
                );
            });
            return result;
        }
        throw new Error('No token provided');
    };
}

module.exports = TokenHandler;
