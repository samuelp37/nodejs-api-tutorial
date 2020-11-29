
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.TESTNODEJS_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PWD,
      database: process.env.TESTNODEJS_DB_NAME
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  }
};
