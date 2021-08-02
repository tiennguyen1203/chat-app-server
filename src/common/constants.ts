import * as dotenv from 'dotenv';
dotenv.config({});

export const REGION = process.env.REGION;

export const USER_POOL_ID = process.env.USER_POOL_ID;

export const USER_POOL_WEB_CLIENT_ID = process.env.USER_POOL_WEB_CLIENT_ID;

export const AWS_COGNITO_AUTHORITY = process.env.AWS_COGNITO_AUTHORITY;
