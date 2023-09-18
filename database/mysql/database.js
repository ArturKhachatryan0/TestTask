import { MYSQL } from "../../config/index.js";
import knex from "knex";

const database = knex({
  client: "mysql2",
  connection: {
    host: MYSQL.HOST,
    port: MYSQL.PORT,
    database: MYSQL.DATABASE,
    user: MYSQL.USER,
    password: MYSQL.PASSWORD,
  },
});

export default database;
