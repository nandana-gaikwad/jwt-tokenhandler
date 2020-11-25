const CONSTANTS = {
    JWT_SERVICE_NAME : 'lambda-jwt-refresh',
    JWT_SECRETS_KEY : 'jwt_enabled_services',
    JWT_CACHE_REFRESH_TIME : '0 * * * * *',
    DEFAULT_AWS_REGION : 'us-east-1',
    CACHE_MAX_AGE : '1d',
    AUTH0_ALGORITHMS : ['RS256'],
    M2M_API_AUDIENCE : `https://${process.env.NODE_ENV}-ows.theorchard.io`,
    DEV_M2M_API_AUDIENCE : 'https://dev-ows.theorchard.io',
    PROD_API_AUDIENCE : 'https://workstation.theorchard.com/api',
    QA_API_AUDIENCE : 'https://workstation.qaorch.com/api',
    VALID_JWT_AUDS : [],
}

if (process.env.NODE_ENV === 'local' || 'dev') {
    CONSTANTS.DEV_API_AUDIENCE = `https://${process.env.AUTH0_DOMAIN}/api/v2/`;
    CONSTANTS.VALID_JWT_AUDS.push(CONSTANTS.DEV_M2M_API_AUDIENCE, CONSTANTS.DEV_API_AUDIENCE);
}

if (process.env.NODE_ENV === 'qa')
    CONSTANTS.VALID_JWT_AUDS.push(CONSTANTS.QA_API_AUDIENCE, CONSTANTS.M2M_API_AUDIENCE);

if (process.env.NODE_ENV === 'prod')
    CONSTANTS.VALID_JWT_AUDS.push(CONSTANTS.PROD_API_AUDIENCE, CONSTANTS.M2M_API_AUDIENCE);

module.exports = CONSTANTS;
