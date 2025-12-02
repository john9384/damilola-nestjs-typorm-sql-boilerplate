import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  
  // Database configuration
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  // SSL settings using sslmode semantics
  POSTGRES_SSLMODE: Joi.string()
    .valid('disable', 'prefer', 'require', 'verify-ca', 'verify-full')
    .default('disable'),
  POSTGRES_SSL_REJECT_UNAUTHORIZED: Joi.alternatives()
    .try(Joi.boolean(), Joi.string().valid('true', 'false'))
    .optional(),
  POSTGRES_SSL_CA: Joi.string().optional(),
  POSTGRES_SSL_CERT: Joi.string().optional(),
  POSTGRES_SSL_KEY: Joi.string().optional(),
  
  // Application configuration
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
});
