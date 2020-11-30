const DEV_ENVIRONMENT = process.env.NODE_ENV == 'local' ? 'dev' : 'dev';
const ENVIRONMENT = process.env.NODE_ENV || DEV_ENVIRONMENT;
const PROD_API_AUDIENCE = 'https://workstation.theorchard.com/api';
const QA_API_AUDIENCE = 'https://workstation.qaorch.com/api';
const M2M_API_AUDIENCE = `https://${ENVIRONMENT}-ows.theorchard.io`
const THEORCHARD_API_AUDIENCE = ENVIRONMENT == `prod` ? PROD_API_AUDIENCE : QA_API_AUDIENCE
const CONSTANTS = {
    JWT_SERVICE_NAME : 'lambda-jwt-refresh',
    JWT_SECRETS_KEY : 'jwt_enabled_services',
    JWT_CACHE_REFRESH_TIME : '0 0 */12 * * *',
    DEFAULT_AWS_REGION : 'us-east-1',
    CACHE_MAX_AGE : '1d',
    TTL : 46800,
    AUTH0_ALGORITHMS : ['RS256'],
    PROD_AUTH0_TENANT : 'workstation.auth0.com',
    AUTH0_DOMAIN : ENVIRONMENT == 'prod' ? PROD_AUTH0_TENANT : `${ENVIRONMENT}-orchard.auth0.com`,
    VALID_JWT_AUDS : [M2M_API_AUDIENCE, THEORCHARD_API_AUDIENCE]
}

module.exports = CONSTANTS;
