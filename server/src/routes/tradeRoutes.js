import { Router } from 'express';
import { createTrade, deleteTrade, getSummary, getTrades } from '../controllers/tradeController.js';

const router = Router();

router.get('/trades', getTrades);
router.post('/trades', createTrade);
router.delete('/trades/:id', deleteTrade);
router.get('/summary', getSummary);

export default router;
