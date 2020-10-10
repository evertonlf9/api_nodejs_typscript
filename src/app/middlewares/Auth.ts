import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

import ControllerAuth from '../controllers/auth';

const Auth = (req: Request, res: Response, next: NextFunction) => {
    const data: any = req.body;
   
    if((!data.username || !data.password) || (data.username === "" || data.password === "")) {
        return res.status(422).json({ error: '', message:"", response: []})
    }

    ControllerAuth(req, res, fs.readFileSync(path.resolve(__dirname, '../../../public/private.pem'), 'utf8'));
};

export default Auth;