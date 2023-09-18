/**
 * @param { import("knex").Knex } knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const up = async (knex) => {
  return knex.schema.createTable("files", (table) => {
    table.increments("id");
    table.string("filename", 255);
    table.string("extension", 10);
    table.string("mimetype", 20);
    table.integer("size");
    table.dateTime("uploadDate");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
export const down = async (knex) => {
  return knex.schema.dropTable("files");
};
