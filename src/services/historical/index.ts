import API from 'binance';
import { BINANCE_API_KEY, BINANCE_API_SECRET } from '../../config';
import { CurrencyPair, CandlestickInterval } from '../../enums';

const binance = new API.BinanceRest({
	key: BINANCE_API_KEY,
	secret: BINANCE_API_SECRET,
});

class HistoricalService {
	static async getData() {
		const data = await binance.klines({
			symbol: CurrencyPair.BTC_USD,
			interval: CandlestickInterval.ONE_MINUTE,
		});
		return data;
	}
}

export default HistoricalService;
