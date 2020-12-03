const AWS = require('aws-sdk');
const constants = require('./constants/jwt');
const Sentry = require('@sentry/node');

const utils = {
    getSecret: (secretManager, secretName) => new Promise((resolve, reject) => {
        secretManager.getSecretValue({ SecretId: secretName }, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data.SecretString);
        });
    }),
    updateSecretValue: (secretManager, secretName, secretValue) => new Promise((resolve, reject) => {
        secretManager.updateSecret({ SecretId: secretName, SecretString: secretValue }, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    })
};

class CacheHandler {
    constructor(cache, serviceName = null) {
        this.cache = cache;
        this.serviceName = serviceName;
    }

    async cacheJwtEnabledServices() {
        try {
            const secretManager = new AWS.SecretsManager({ region: constants.DEFAULT_AWS_REGION });
            const jwtEnabledservices = await utils.getSecret(secretManager,
                `${process.env.NODE_ENV}/${constants.JWT_SERVICE_NAME}/${constants.JWT_SECRETS_KEY}`
            );
            if (jwtEnabledservices) {
                const jwtEnabledServicesList = JSON.parse(jwtEnabledservices);
                if (!jwtEnabledServicesList.includes(this.serviceName)) {
                    jwtEnabledServicesList.push(this.serviceName);
                    this.cache.set(constants.JWT_SECRETS_KEY, jwtEnabledServicesList, constants.TTL);
                    await utils.updateSecretValue(secretManager,
                        `${process.env.NODE_ENV}/${constants.JWT_SERVICE_NAME}/${constants.JWT_SECRETS_KEY}`,
                        JSON.stringify(jwtEnabledServicesList))
                } else
                    this.cache.set(constants.JWT_SECRETS_KEY, jwtEnabledservices, constants.TTL);
            }            
        } catch (error) {
            Sentry.captureException(error);
        }
    };

    retriveCache(key) {
        return this.cache.get(key);
    }
}

module.exports = CacheHandler;
