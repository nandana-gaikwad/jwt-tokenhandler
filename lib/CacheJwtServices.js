const AWS = require('aws-sdk');
const constants = require('./constants/jwt');

const ttl = 46800;

const utils = {
    getSecret: (secretManager, secretName) => new Promise((resolve, reject) => {
        secretManager.getSecretValue({ SecretId: secretName }, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data.SecretString);
        });
    })
};

class CacheHandler {
    constructor(serverConfig) {
        this.serverConfig = serverConfig;
    }
    cacheJwtEnabledServices = async () => {
        const secretManager = new AWS.SecretsManager({ region: constants.DEFAULT_AWS_REGION });
        const jwtEnabledservices = await utils.getSecret(secretManager,
            `${process.env.NODE_ENV}/${constants.JWT_SERVICE_NAME}/${constants.JWT_SECRETS_KEY}`
        );
        if (jwtEnabledservices)
            this.serverConfig.cache.set(constants.JWT_SECRETS_KEY, jwtEnabledservices, ttl);
    };

    retriveCache = (key) => this.serverConfig.cache.get(key);
}

module.exports = CacheHandler;
