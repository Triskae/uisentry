import * as Joi from 'joi';

export enum EnvVars {
  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_NAME = 'DATABASE_NAME',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_USER = 'DATABASE_USER',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',

  REGION = 'REGION',
  PRODUCTS = 'PRODUCTS',
  TIMEZONE = 'TIMEZONE',
  TELEGRAM_BOT_TOKEN = 'TELEGRAM_BOT_TOKEN',
  TELEGRAM_CHAT_ID = 'TELEGRAM_CHAT_ID',
  HTTP_TIMEOUT_MS = 'HTTP_TIMEOUT_MS',
}

const rawSchema = {
  [EnvVars.DATABASE_HOST]: Joi.string().ip().required(),
  [EnvVars.DATABASE_NAME]: Joi.string().required(),
  [EnvVars.DATABASE_PORT]: Joi.number(),
  [EnvVars.DATABASE_USER]: Joi.string().required(),
  [EnvVars.DATABASE_PASSWORD]: Joi.string().required(),

  [EnvVars.REGION]: Joi.string().required(),
  [EnvVars.PRODUCTS]: Joi.string().required(),
  [EnvVars.TIMEZONE]: Joi.string().required(),
  [EnvVars.TELEGRAM_BOT_TOKEN]: Joi.string(),
  [EnvVars.TELEGRAM_CHAT_ID]: Joi.string(),
  [EnvVars.HTTP_TIMEOUT_MS]: Joi.number().default(5000),
};

export const envVarsSchema: Joi.ObjectSchema = Joi.object(rawSchema).options({
  stripUnknown: true,
});
