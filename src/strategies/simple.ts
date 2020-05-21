import Strategy from './strategy';
import { RunData } from '../types';

class SimpleStrategy extends Strategy {
  async run({ candleSticks, time }: RunData) {
    const _length = candleSticks.length;
    if (_length < 50) return;

    const lastStickPrice = parseFloat(candleSticks[_length - 1].close);
    const penultimateStickPrice = parseFloat(candleSticks[_length - 2].close);

    const price = lastStickPrice;
    const openPositions = this.getOpenPositions();

    if (openPositions.length == 0) {
      if (lastStickPrice < penultimateStickPrice) {
        return this.onBuySignal({ price, time });
      }
    } else if (lastStickPrice > penultimateStickPrice) {
      {
        openPositions.forEach((position) => {
          if (position.enter.price * 1.01 < price) {
            const amount = position.enter.amount;
            this.onSellSignal({ price, time, amount, position });
          }
        });
      }
    }
  }
}

export default SimpleStrategy;
