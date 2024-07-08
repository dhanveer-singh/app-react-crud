import express from 'express';
import { addNewUser, fetchUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/addNewUser', addNewUser);
router.get('/fetchUser', fetchUser)

export default router;