import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from '../server/src/app.js';

dotenv.config();

let isConnected = false;

const ensureDatabaseConnection = async () => {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
};

export default async function handler(req, res) {
  try {
    await ensureDatabaseConnection();
    return app(req, res);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Unable to connect to database'
    });
  }
}
