import db from '../../models';
import BaseRepository from './baseRepository';
const { User } = db;

class UserRepository {
    // https://sequelize.org/master/manual/raw-queries.html
    static query(sql: any, queryTypes: any, sqlCount?: any, queryTypesCount?: any) {
        return new Promise((resolve, reject) => BaseRepository
            .query(db, sql, queryTypes, sqlCount, (queryTypesCount || queryTypes))
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }

    static getUsers(query: any) {
        return new Promise((resolve, reject) => BaseRepository
            .getAll(User, query)
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }

    static getById(id: number) {
        return new Promise((resolve, reject) => BaseRepository
            .getById(User, id)
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }

    static createUser(params: any) {
        return new Promise((resolve, reject) => BaseRepository
        .create(User, params)
        .then((result) => resolve(result))
        .catch((err) => reject(err)));
    }

    static update(params: any, query: any) {
        return new Promise((resolve, reject) => BaseRepository
            .update(User, params, query)
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }
}
export default UserRepository;