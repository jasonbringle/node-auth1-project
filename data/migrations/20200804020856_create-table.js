
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.text('name', 128)
            .unique()
            .notNullable()
        tbl.text('password', 128)
            .notNullable()
  })
};

exports.down = function(knex) {
  knex.schema
    .dropTableIfExists('users')
};
