import { registerAs } from '@nestjs/config';

const path = process.env.EASEY_ACCOUNT_API_PATH || 'api/account-mgmt';
const host = process.env.EASEY_ACCOUNT_API_HOST || 'localhost';
const port = process.env.EASEY_ACCOUNT_API_PORT || 8080;

let uri = `https://${host}/${path}`;

if (host === 'localhost') {
  uri = `http://localhost:${port}/${path}`;
}

export default registerAs('app', () => ({
  name: 'account-api',
  title: process.env.EASEY_ACCOUNT_API_TITLE || 'Account Management',
  path,
  host,
  port,
  uri,
  env: process.env.EASEY_ACCOUNT_API_ENV || 'local-dev',
  version: process.env.EASEY_ACCOUNT_API_VERSION || 'v0.0.0',
  published: process.env.EASEY_ACCOUNT_API_PUBLISHED || 'local',
}));
