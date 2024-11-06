import { registerAs } from '@nestjs/config';
import {
  getConfigValue,
  getConfigValueNumber,
  getConfigValueBoolean,
} from '@us-epa-camd/easey-common/utilities';

require('dotenv').config();

const host = getConfigValue('EASEY_ACCOUNT_API_HOST', 'localhost');
const port = getConfigValueNumber('EASEY_ACCOUNT_API_PORT', 8030);
const path = getConfigValue('EASEY_ACCOUNT_API_PATH', 'account-mgmt');

let uri = `https://${host}/${path}`;

if (host === 'localhost') {
  uri = `http://localhost:${port}/${path}`;
}

const apiHost = getConfigValue('EASEY_API_GATEWAY_HOST', 'api.epa.gov/easey/dev');

export const PAGINATION_MAX_PER_PAGE = getConfigValueNumber(
  'EASEY_ACCOUNT_API_PAGINATION_MAX_PER_PAGE', 500,
);

export const TRANSACTION_DATE_LIMIT_YEARS = getConfigValueNumber(
  'EASEY_ACCOUNT_API_TRANSACTION_DATE_LIMIT_YEARS', 2
);

export default registerAs('app', () => ({
  name: 'account-api',
  host, port, path, uri,
  title: getConfigValue(
    'EASEY_ACCOUNT_API_TITLE', 'Account Management',
  ),
  description: getConfigValue(
    'EASEY_ACCOUNT_API_DESCRIPTION',
    'Account management API endpoints for account information, allowance holdings, transactions, and compliance',
  ),
  env: getConfigValue(
    'EASEY_ACCOUNT_API_ENV', 'local-dev',
  ),
  enableApiKey: getConfigValueBoolean(
    'EASEY_ACCOUNT_API_ENABLE_API_KEY',
  ),
  secretToken: getConfigValue(
    'EASEY_ACCOUNT_API_SECRET_TOKEN',
  ),
  enableSecretToken: getConfigValueBoolean(
    'EASEY_ACCOUNT_API_ENABLE_SECRET_TOKEN',
  ),
  enableCors: getConfigValueBoolean(
    'EASEY_ACCOUNT_API_ENABLE_CORS', true,
  ),
  enableGlobalValidationPipes: getConfigValueBoolean(
    'EASEY_ACCOUNT_API_ENABLE_GLOBAL_VALIDATION_PIPE', true,
  ),
  version: getConfigValue(
    'EASEY_ACCOUNT_API_VERSION', 'v0.0.0',
  ),
  published: getConfigValue(
    'EASEY_ACCOUNT_API_PUBLISHED', 'local',
  ),
  // ENABLES DEBUG CONSOLE LOGS
  enableDebug: getConfigValueBoolean(
    'EASEY_ACCOUNT_API_ENABLE_DEBUG',
  ),
  transactionDateYearsLimit: TRANSACTION_DATE_LIMIT_YEARS,
  perPageLimit: PAGINATION_MAX_PER_PAGE,
  apiHost: apiHost,
  authApi: {
    uri: getConfigValue('EASEY_AUTH_API', `https://${apiHost}/auth-mgmt`),
  },
}));
