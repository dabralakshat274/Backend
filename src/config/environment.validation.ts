import * as Joi from 'joi'

export default Joi.object({
    NODE_ENV:Joi.string().valid('development','test','production','staging' )
    .default('development'),
    Database_PORT: Joi.number().port().default(5432 ),
    Database_PASSWORD: Joi.string().required(),
    Database_HOST: Joi.string().required(),
    Database_USER: Joi.string().required(),
    Database_NAME: Joi.string().required(),
    PROFILE_API_KEY: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_TOKEN_AUDIENCE: Joi.string().required(),
    JWT_TOKEN_ISSUER: Joi.string().required(),
    JWT_ACCESS_TOKEN_TTL: Joi.number().required(),     
})