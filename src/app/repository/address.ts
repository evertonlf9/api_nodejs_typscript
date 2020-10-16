import db from '../../models';
import BaseRepository from './baseRepository';
const { AddressModel, UserModel } = db;

class AdressRepository {
  static getAnddress(id: number, association: any = {}) {
    return new Promise((resolve, reject) => BaseRepository
      .getById(UserModel, id, association)
      .then((result) => resolve(result))
      .catch((err) => reject(err)));
  }
}

export default AdressRepository

// module.exports = {
//   async index(req, res) {
//     const { user_id } = req.params;

//     const user = await User.findByPk(user_id, {
//       include: { association: 'addresses' }
//     });

//     return res.json(user.addresses);
//   },

//   async store(req, res) {
//     const { user_id } = req.params;
//     const { zipcode, street, number } = req.body;

//     const user = await User.findByPk(user_id);

//     if (!user) {
//       return res.status(400).json({ error: 'User not found' });
//     }

//     const address = await Address.create({
//       zipcode,
//       street,
//       number,
//       user_id,
//     });

//     return res.json(address);
//   }
// };