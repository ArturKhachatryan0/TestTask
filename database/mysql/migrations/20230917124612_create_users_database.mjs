/**
 * @param { import("knex").Knex } knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async (knex) => {
  return knex.schema.createTable("users", function (table) {
    table.string("id", 255).unique();
    table.string("password", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async (knex) => {
  return knex.schema.dropTable("users");
};
