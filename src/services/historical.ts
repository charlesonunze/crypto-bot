import API from 'binance';
import { BINANCE_API_KEY, BINANCE_API_SECRET } from '../config';
import { CandleStick, CurrencyPair, CandlestickInterval } from '../types';

const binance = new API.BinanceRest({
  key: BINANCE_API_KEY,
  secret: BINANCE_API_SECRET,
});

class HistoricalService {
  static async getData() {
    const lastMonth = Date.now() - 2628000000;
    const now = Date.now();

    const data: CandleStick[] = await binance.klines({
      symbol: CurrencyPair.BTC_USD,
      interval: CandlestickInterval.ONE_MINUTE,
      startTime: lastMonth,
      endTime: now,
      limit: 1000,
    });

    return data;
  }
}

export default HistoricalService;
