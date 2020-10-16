import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import AddressRepository from '../repository/address';
import operatorsAliases from '../../config/operatorsAliases.config';

class AddressController  {
  /**
   * @api {get} /api/v1/address/user:id/
   * @apiName GetAddress
   * @apiGroup Address
   *
   *  @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {NUmber} id User identifier.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": 1,
   *       "first_name": "John",
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   */
  static GetAddress (req: Request | any, res: Response)  {

    AddressRepository.getAnddress(req.params.id, {include: { association: 'addresses' }})
    .then((registers) => res.json(registers))
    .catch((error) => res.json(error));
  }
}

export default AddressController;