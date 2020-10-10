import jwt from 'jsonwebtoken';
import { QueryTypes } from 'sequelize';
import UserRepository from '../repository/user';
import { Request, Response } from 'express';

/**
 * @api {post} /api/authenticate Auth
 * @apiName Authenticate
 * @apiGroup Auth
 *
 * @apiParam {String} email  Email of the User.
 * @apiParam {String} username  Username of the User.
 *
 * @apiSuccess {Number} id User identifier.
 */
const Auth = (req: Request, res: Response, privateKey: string) => {

    const fields = 'id, first_name, login, password';

    const where = `WHERE User.login = :username`;
    const sql = `SELECT ${fields} FROM Users AS User ${where}`;
    const queryTypes = { 
        nest: true, 
        replacements: { username: req.body.username.trim() }, 
        type: QueryTypes.SELECT 
    };

    UserRepository.query(sql, queryTypes)
    .then((result: any) => {      
        if(result.rows) {
            const data = {...result.rows[0]}; 

            if(data.password === req.body.password) {

                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: delete data.password
                }, 
                privateKey, 
                { algorithm: 'HS256'});
                
                res.cookie('x-access-token', token);
                // res.cookie('x-access-token', token, { httpOnly: true, secure: true }); //for https
                res.setHeader('x-access-token', `Bearer ${token}`);

                return res.send({message: "successfull authentication", response: data});            
            }
        }

        return res.json({ error: {}, message:"authentication failed", response: []})
    })
    .catch((err: Error) => res.status(403).json({ error: err, message:"authentication failed", response: []}));
    
}
export default Auth;