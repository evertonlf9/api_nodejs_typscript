import { Router } from 'express';
import { Query, GetUsers, GetById, Insert, Update, UpdatetRegisterUser } from '../validators/user';

const router = Router();
    
router.get('/query', Query.validations, Query.handler);
router.get('/', GetUsers.validations, GetUsers.handler);
router.get('/:id', GetById.validations, GetById.handler);
router.post('/', Insert.validations, Insert.handler);
router.put('/:id', Update.validations, Update.handler);
router.patch('/:id', UpdatetRegisterUser.validations, UpdatetRegisterUser.handler); 

export default router;