import express from 'express';
import controller from '../controllers/tariffs.controller';
const router = express.Router();

router.post('/tariffs/', controller.computeTariff);

export default router;
