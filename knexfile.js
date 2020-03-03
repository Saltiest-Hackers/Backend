// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3"
    },
    useNullAsDefault: true
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection:
      "postgres://ixaeijozhwlhsk:c142d103727c44ea602d9b9ab9850d5d69696f911d118732af4f291a9fb6786c@ec2-52-202-185-87.compute-1.amazonaws.com:5432/dr4jjgr6ti83k",

    migrations: {
      tableName: "knex_migrations"
    }
  }
};
