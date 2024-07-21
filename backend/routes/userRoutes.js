import express from 'express';
import { addNewUser, deleteUser, fetchUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/addNewUser', addNewUser);
router.get('/fetchUser', fetchUser);
router.post('/deleteUser', deleteUser);

export default router;