"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configs = {
    development: {
        username: "root",
        password: '123456',
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
        dialectOptions: {
            charset: 'utf8',
        },
        define: {
            timestamps: true,
        }
    },
    test: {
        username: "root",
        password: '123456',
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
        dialectOptions: {
            charset: 'utf8',
        },
        define: {
            timestamps: true
        }
    },
    production: {
        username: "root",
        password: '123456',
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
        dialectOptions: {
            charset: 'utf8',
        },
        define: {
            timestamps: true
        }
    }
};
exports.default = configs;
