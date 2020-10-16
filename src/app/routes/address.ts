import { Router } from 'express';
// import { Query, GetUsers, GetById, Insert, Update, UpdatetRegisterUser } from '../validators/user';
import Address from '../controllers/address';

const router = Router();

router.get('/user/:id/', Address.GetAddress);
// router.post('/user/:id/', Address.CreateAddress);

export default router;