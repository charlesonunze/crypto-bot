import { config } from 'dotenv';

config();

const BINANCE_API_KEY = process.env.BINANCE_API_KEY;
const BINANCE_API_SECRET = process.env.BINANCE_API_SECRET;

export { BINANCE_API_KEY, BINANCE_API_SECRET };
