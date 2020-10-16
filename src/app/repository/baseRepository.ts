class BaseRepository {

    static async findAll(table: any, query: any) {
        return await table.findAll(query);
    }

    static async findOne(table: any, query: any) {
        return await table.findOne(query);
    }

    static async getAll(table: any, query: any) {
        return await table.findAndCountAll(query);
    }

    static async getById(table: any, id: number, association: any = {}) {
        return await table.findByPk(id, association);
    }

    static async create(table: any, params: any) {
        return await table.create(params);
    }

    static async update(table: any, params: any, query: any) {
        return await table.update(params, query);
    }

    static async query(table: any, sql: any, QueryTypes = {}, sqlCount = '', QueryTypesCount = {}) {
        try {
            const results = await table.sequelize.query(sql, QueryTypes);

            if(sqlCount !== '') {
                const count = await table.sequelize.query(sqlCount, QueryTypesCount)
                return {count: count[0]['count(*)'], rows: results,}
            }

            return {rows: results}
        }catch(e) {
            return {error: e};
        }
    }
}
export default BaseRepository;