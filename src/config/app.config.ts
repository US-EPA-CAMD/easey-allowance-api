require('dotenv').config();
import { registerAs } from '@nestjs/config';
import { parseBool } from '@us-epa-camd/easey-common/utilities';

const path = process.env.EASEY_ACCOUNT_API_PATH || 'account-mgmt';
const host = process.env.EASEY_ACCOUNT_API_HOST || 'localhost';
const port = +process.env.EASEY_ACCOUNT_API_PORT || 8030;

export const PAGINATION_MAX_PER_PAGE =
  +process.env.EASEY_ACCOUNT_API_PAGINATION_MAX_PER_PAGE || 25000;

export const TRANSACTION_DATE_LIMIT_YEARS =
  +process.env.EASEY_ACCOUNT_API_TRANSACTION_DATE_LIMIT_YEARS || 2;

let uri = `https://${host}/${path}`;

if (host === 'localhost') {
  uri = `http://localhost:${port}/${path}`;
}

export default registerAs('app', () => ({
  name: 'account-api',
  title: process.env.EASEY_ACCOUNT_API_TITLE || 'Account Management',
  description:
    'Account management API endpoints for account information, allowance holdings, transactions, and compliance',
  path,
  host,
  apiHost: process.env.EASEY_API_GATEWAY_HOST || 'api.epa.gov/easey/dev',
  port,
  uri,
  env: process.env.EASEY_ACCOUNT_API_ENV || 'local-dev',
  enableCors: parseBool(process.env.EASEY_ACCOUNT_API_ENABLE_CORS, true),
  enableApiKey: parseBool(process.env.EASEY_ACCOUNT_API_ENABLE_API_KEY, true),
  enableAuthToken: parseBool(process.env.EASEY_ACCOUNT_API_ENABLE_AUTH_TOKEN),
  enableGlobalValidationPipes: parseBool(
    process.env.EASEY_ACCOUNT_API_ENABLE_GLOBAL_VALIDATION_PIPE,
    true,
  ),
  version: process.env.EASEY_ACCOUNT_API_VERSION || 'v0.0.0',
  published: process.env.EASEY_ACCOUNT_API_PUBLISHED || 'local',
  perPageLimit: PAGINATION_MAX_PER_PAGE,
}));
