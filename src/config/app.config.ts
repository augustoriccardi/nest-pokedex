export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3002,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7, // El + es porque cuando llega desde la validación de Joi el process.env.DEFAULT_LIMIT es un String y está definido
});
