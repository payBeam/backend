import express from 'express';
import { createUser, getUsers, getUser } from '@/controllers/user.controller';
const router = express.Router();


router.post('/users', createUser);
router.get('/', getUser);
router.get('/users', getUsers);

export default router;
