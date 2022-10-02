import { registerAs } from '@nestjs/config';
import {
  getConfigValue,
  getConfigValueNumber,
  getConfigValueBoolean,
} from '@us-epa-camd/easey-common/utilities';

require('dotenv').config();

const path = getConfigValue('EASEY_ACCOUNT_API_PATH', 'account-mgmt');
const host = getConfigValue('EASEY_ACCOUNT_API_HOST', 'localhost');
const port = getConfigValueNumber('EASEY_ACCOUNT_API_PORT', 8030);

export const PAGINATION_MAX_PER_PAGE = getConfigValueNumber(
  'EASEY_ACCOUNT_API_PAGINATION_MAX_PER_PAGE', 500,
);

export const TRANSACTION_DATE_LIMIT_YEARS = getConfigValueNumber(
  'EASEY_ACCOUNT_API_TRANSACTION_DATE_LIMIT_YEARS', 2
);

let uri = `https://${host}/${path}`;

if (host === 'localhost') {
  uri = `http://localhost:${port}/${path}`;
}

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
  apiHost: getConfigValue(
    'EASEY_API_GATEWAY_HOST', 'api.epa.gov/easey/dev',
  ),
  env: getConfigValue(
    'EASEY_ACCOUNT_API_ENV', 'local-dev',
  ),
  enableCors: getConfigValueBoolean(
    'EASEY_ACCOUNT_API_ENABLE_CORS', true,
  ),
  enableApiKey: getConfigValueBoolean(
    'EASEY_ACCOUNT_API_ENABLE_API_KEY',
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
  perPageLimit: PAGINATION_MAX_PER_PAGE,
  transactionDateYearsLimit: TRANSACTION_DATE_LIMIT_YEARS,
  enableSecretToken: getConfigValueBoolean(
    'EASEY_ACCOUNT_API_ENABLE_SECRET_TOKEN',
  ),
  // ENABLES DEBUG CONSOLE LOGS
  enableDebug: getConfigValueBoolean(
    'EASEY_ACCOUNT_API_ENABLE_DEBUG',
  ),
}));
