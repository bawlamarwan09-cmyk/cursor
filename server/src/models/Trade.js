import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema(
  {
    tradeDate: {
      type: Date,
      required: true
    },
    symbol: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    direction: {
      type: String,
      enum: ['LONG', 'SHORT'],
      required: true
    },
    entryPrice: {
      type: Number,
      required: true,
      min: 0
    },
    exitPrice: {
      type: Number,
      required: true,
      min: 0
    },
    positionSize: {
      type: Number,
      required: true,
      min: 0
    },
    pnl: {
      type: Number,
      required: true
    },
    setup: {
      type: String,
      required: true,
      trim: true
    },
    emotions: {
      type: String,
      trim: true,
      default: ''
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    },
    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Trade = mongoose.model('Trade', tradeSchema);
