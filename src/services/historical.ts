import API from 'binance';
import { BINANCE_API_KEY, BINANCE_API_SECRET } from '../config';
import { CandleStick, CurrencyPair, CandlestickInterval } from '../types';
import { toMilliSeconds } from '../utils';

const binance = new API.BinanceRest({
  key: BINANCE_API_KEY,
  secret: BINANCE_API_SECRET
});

class HistoricalService {
  constructor(public startTime: string) {}

  async getData() {
    const data: CandleStick[] = await binance.klines({
      symbol: CurrencyPair.BTC_USD,
      interval: CandlestickInterval.ONE_MINUTE,
      startTime: toMilliSeconds(this.startTime),
      endTime: Date.now(),
      limit: 1000
    });

    return data;
  }
}

export default HistoricalService;
