export function up(knex) {
    return knex.schema.createTable("users", t => {
        t.increments();

        t.string("username").unique().notNullable();

        t.string("password").unique().notNullable();


        t.datetime("createdAt");
        t.datetime("updatedAt");
    });
}

exports.down = knex => knex.schema.dropTable("users");
