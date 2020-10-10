import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import ReportRepository from '../repository/report';
import Op from '../../config/operatorsAliases.config';

class ReportController  {
  static show (req: Request, res: Response) {

    // Encontrar todos usuários que tem email que termina com @rocketseat.com.br
    // Desses usuários eu quero buscar todos que moram na rua "Rua Guilherme Gembala"
    // Desses usuários eu quero buscar as tecnologias que começam com React
    const query = {
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.$iLike]: '%@rocketseat.com.br'
        }
      },
      include: [
        { 
          association: 'addresses', 
          where: { 
            street: 'Rua Guilherme Gembala'
          } 
        },
        { 
          association: 'techs', 
          required: false,
          where: {
            name: {
              [Op.$iLike]: 'React%'
            }
          }
        },
      ]
    }
    ReportRepository.findAll(query)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));

  }

}

export default ReportController;