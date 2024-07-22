import express from 'express';
import { addNewUser, deleteUser, updateUser, fetchUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/addNewUser', addNewUser);
router.get('/fetchUser', fetchUser);
router.get('/updateUser', updateUser);
router.post('/deleteUser', deleteUser);

export default router;