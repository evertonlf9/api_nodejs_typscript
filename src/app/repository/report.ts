import db from '../../models';
import BaseRepository from './baseRepository';
const { User } = db;

class ReportRepository {

    static findAll(params: any) {
        return new Promise((resolve, reject) => BaseRepository
            .findAll(User, params)
            .then((result) => resolve(result))
            .catch((err) => reject(err)));
    }
}
export default ReportRepository;