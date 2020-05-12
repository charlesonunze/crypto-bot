import Strategy from './strategy';
import { CandleStick } from '../types';

class SimpleStrategy extends Strategy {
	async run(candleSticks: CandleStick[], time: number) {
		const _length = candleSticks.length;
		if (_length < 50) return;

		const lastStickPrice = parseFloat(candleSticks[_length - 1].close);
		const penultimateStickPrice = parseFloat(candleSticks[_length - 2].close);

		const price = lastStickPrice;
		const openPositions = this.getOpenPositions();

		if (openPositions.length == 0) {
			if (lastStickPrice < penultimateStickPrice) {
				return this.onBuySignal(price, time);
			}
		} else if (lastStickPrice > penultimateStickPrice) {
			{
				openPositions.forEach((p) => {
					if (p.enter.price * 1.01 < price) {
						this.onSellSignal(price, time, p.enter.amount, p);
					}
				});
			}
		}
	}
}

export default SimpleStrategy;
