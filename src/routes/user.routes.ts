import express from 'express';
import { createUser, getUsers, getUser } from '@/controllers/user.controller';

const router = express.Router();


router.post('/users', createUser);
router.get('/', getUser);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Fetch a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 */

router.get('/users', getUsers);

export default router;
