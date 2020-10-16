const configs: any = {
  development: {
    username: 'root',
    password: '123456',
    // database: "database_development",
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8',
    },
    define: {
      timestamps: true,
      // underscored: true //default pascal case userGroup, snake case quando é separado por '_' user_group
    }
  },
  test: {
    username: 'root',
    password: '123456',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8',
    },
    define: {
      timestamps: true
    }
  },
  production: {
    username: 'root',
    password: '123456',
    database: 'database_test',
    // database: "database_production",
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8',
    },
    define: {
      timestamps: true
    }
  }
}

export default configs;
