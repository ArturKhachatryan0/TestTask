import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
    migrations: {
      directory: "./database/mysql/migrations",
      loadExtensions: [".mjs"],
    },
  },
};
