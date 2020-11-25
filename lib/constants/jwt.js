const JWT_SERVICE_NAME = 'lambda-jwt-refresh';
const JWT_SECRETS_KEY = 'jwt_enabled_services';
const JWT_CACHE_REFRESH_TIME = '0 * * * * *';
const DEFAULT_AWS_REGION = 'us-east-1';
const CACHE_MAX_AGE = '1d';
const AUTH0_ALGORITHMS = ['RS256'];

const M2M_API_AUDIENCE = `https://${process.env.NODE_ENV}-ows.theorchard.io`;
const DEV_M2M_API_AUDIENCE = 'https://dev-ows.theorchard.io';
const PROD_API_AUDIENCE = 'https://workstation.theorchard.com/api';
const QA_API_AUDIENCE = 'https://workstation.qaorch.com/api';

const VALID_JWT_AUDS = [];

if (process.env.NODE_ENV === 'local' || 'dev') {
    const DEV_API_AUDIENCE = `https://${process.env.AUTH0_DOMAIN}/api/v2/`;
    VALID_JWT_AUDS.push(DEV_M2M_API_AUDIENCE, DEV_API_AUDIENCE);
}

if (process.env.NODE_ENV === 'qa')
    VALID_JWT_AUDS.push(QA_API_AUDIENCE, M2M_API_AUDIENCE);

if (process.env.NODE_ENV === 'prod')
    VALID_JWT_AUDS.push(PROD_API_AUDIENCE, M2M_API_AUDIENCE);
