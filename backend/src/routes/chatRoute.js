import express from 'express';
import { getChat, sendChat } from '../controllers/chatController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const chatRoute = express.Router();

chatRoute.post('/sendMessage/:receiverId', isAuthenticated, sendChat);
chatRoute.get('/getMessage/:room', isAuthenticated, getChat);


export default chatRoute;
