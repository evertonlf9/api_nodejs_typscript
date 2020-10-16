import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import jwt, { VerifyErrors, VerifyCallback, JsonWebTokenError } from 'jsonwebtoken';

import Error from './Errors';

const IsAuthorized = (req: Request, res: Response, next: NextFunction) => {

	if (typeof req.headers['x-access-token'] !== 'undefined' || req.cookies['x-access-token'] !== 'undefined') {
		// retrieve the authorization header and parse out the
		// JWT using the split function
		const token =  req.cookies['x-access-token'] && req.cookies['x-access-token'].split(' ')[1] || req.cookies['x-access-token'];

		const privateKey = fs.readFileSync(path.resolve(__dirname, '../../../public/private.pem'), 'utf8');
		const callBack = (err: JsonWebTokenError | null) => {
			// if there has been an error...
			if (err) {
				res.clearCookie('x-access-token');
				// shut them out!
				return Error(res, 401, err);
			}
			// if the JWT is valid, allow them to hit
			// the intended endpoint
			return next();
		}
		// Here we validate that the JSON Web Token is valid and has been
		// created using the same private pass phrase
		jwt.verify(token, privateKey, { algorithms: ['HS256'] }, callBack);

	} else {
		res.clearCookie('x-access-token');
		return Error(res, 401);
	}
};

export default IsAuthorized;