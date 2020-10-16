import { Request, Response } from 'express';
import { check, body, param, query, validationResult } from 'express-validator';
import Errors from '../middlewares/Errors';
import RouterUser from '../controllers/user';

// https://express-validator.github.io/docs/
// https://express-validator.github.io/docs/custom-validators-sanitizers.html
// https://express-validator.github.io/docs/check-api.html
// https://auth0.com/blog/express-validator-tutorial/

export const Insert = {
    validations: [
        body('first_name')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        body('last_name')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        body('cpf')
            .trim()
            .isLength({ min: 14, max: 14 }),
        body('rg')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 12, max: 12 }),
        body('login')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        body('email')
            .isEmail()
            .normalizeEmail(),
        body('password')
            .not().isEmpty()
            .isLength({ min: 5, max: 255 })
    ],
    handler: async (req: Request, res: Response) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return Errors(res, 422, errors.array());

        RouterUser.createUser(req, res);
    }
}

export const GetById = {
    validations: [
        param('id')
        .not().isEmpty()
        .isNumeric()
    ],
    handler: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return Errors(res, 422, errors.array());

        RouterUser.GetById(req, res);
    }
}

export const GetUsers = {
    validations: [
        query('page').optional()
        .if(query('page').exists())
        .isNumeric(),
        query('size').optional()
        .if(query('size').exists())
        .isNumeric(),
        query('search').optional()
        .if(query('search').exists())
        .isString()
        .trim()
        .isLength({ min: 0, max: 255 })
    ],
    handler: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return Errors(res, 422, errors.array());

        RouterUser.GetUsers(req, res);
    }
}

export const Query = {
    validations: [
        query('page').if(query('page').exists())
        .isNumeric(),
        query('size').if(query('size').exists())
        .isNumeric(),
        query('search').if(query('search').exists())
        .isString()
        .trim()
        .isLength({ min: 0, max: 255 })
    ],
    handler: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return Errors(res, 422, errors.array());

        RouterUser.query(req, res);
    }
}

export const Update = {
    validations: [
        body('first_name')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        body('last_name')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        body('cpf')
            .trim()
            .isLength({ min: 14, max: 14 }),
        body('rg')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 12, max: 12 }),
        body('login')
            .not().isEmpty()
            .isString()
            .trim()
            .isLength({ min: 3, max: 255 }),
        body('email')
            .isEmail()
            .normalizeEmail(),
        body('password')
            .not().isEmpty()
            .isLength({ min: 5, max: 255 })
    ],
    handler: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return Errors(res, 422, errors.array());

        RouterUser.edit(req, res);
    },
}

export const UpdatetRegisterUser = {
    validations: [
            body('first_name').if(body('first_name').exists())
                .not().isEmpty()
                .isString()
                .trim()
                .isLength({ min: 3, max: 255 }),
            body('last_name').if(body('last_name').exists())
                .not().isEmpty()
                .isString()
                .trim()
                .isLength({ min: 3, max: 255 }),
            body('cpf').if(body('cpf').exists())
                .trim()
                .isLength({ min: 14, max: 14 }),
            body('rg').if(body('rg').exists())
                .not().isEmpty()
                .isString()
                .trim()
                .isLength({ min: 12, max: 12 }),
            body('login').if(body('login').exists())
                .not().isEmpty()
                .isString()
                .trim()
                .isLength({ min: 3, max: 255 }),
            body('email').if(body('email').exists())
                .isEmail()
                .normalizeEmail(),
            body('password').if(body('password').exists())
                .not().isEmpty()
                .isLength({ min: 5, max: 255 })
    ],
    handler: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return Errors(res, 422, errors.array());

        RouterUser.update(req, res);
    },
}
