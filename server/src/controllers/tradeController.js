import { Trade } from '../models/Trade.js';

const normalizeTags = (tagString = '') =>
  tagString
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

export const getTrades = async (_req, res, next) => {
  try {
    const trades = await Trade.find().sort({ tradeDate: -1, createdAt: -1 });
    res.json(trades);
  } catch (error) {
    next(error);
  }
};

export const createTrade = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      tags: Array.isArray(req.body.tags) ? req.body.tags : normalizeTags(req.body.tags)
    };

    const trade = await Trade.create(payload);
    res.status(201).json(trade);
  } catch (error) {
    next(error);
  }
};

export const deleteTrade = async (req, res, next) => {
  try {
    const removed = await Trade.findByIdAndDelete(req.params.id);

    if (!removed) {
      res.status(404).json({ message: 'Trade not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getSummary = async (_req, res, next) => {
  try {
    const summary = await Trade.aggregate([
      {
        $group: {
          _id: null,
          totalTrades: { $sum: 1 },
          wins: { $sum: { $cond: [{ $gt: ['$pnl', 0] }, 1, 0] } },
          losses: { $sum: { $cond: [{ $lt: ['$pnl', 0] }, 1, 0] } },
          netPnl: { $sum: '$pnl' },
          avgPnl: { $avg: '$pnl' }
        }
      }
    ]);

    res.json(
      summary[0] || {
        totalTrades: 0,
        wins: 0,
        losses: 0,
        netPnl: 0,
        avgPnl: 0
      }
    );
  } catch (error) {
    next(error);
  }
};
