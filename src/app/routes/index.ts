import { Router } from 'express';
import UserRouter from './user';
import AddressRouter from './address';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/address', AddressRouter);

// Export the base-router
export default router;
