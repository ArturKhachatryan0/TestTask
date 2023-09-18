export const MYSQL = {
  HOST: process.env.MYSQL_HOST,
  PORT: Number(process.env.MYSQL_PORT),
  DATABASE: process.env.MYSQL_DATABASE,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
};

export const JWT = {
  ACCESS_TOKEN: {
    SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
    EXPIRES_IN: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
  },
  REFRESH_TOKEN: {
    SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    EXPIRES_IN: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
  },
};

export const REDIS = {
  HOST: process.env.REDIS_HOST,
  PORT: process.env.REDIS_PORT,
};
