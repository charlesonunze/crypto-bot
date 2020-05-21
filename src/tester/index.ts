import HistoricalService from '../services/historical';
import { SimpleStrategy } from '../strategies';
import { genRandomString } from '../utils';
import { red, green } from 'colors';
import Strategy from '../strategies/strategy';
import { CandleStick, BuySignalData, SellSignalData } from '../types';

class BackTester {
  strategy!: Strategy;

  async start() {
    const historicalData: CandleStick[] = await HistoricalService.getData();

    this.strategy = new SimpleStrategy({
      onBuySignal: ({ price, time }) => {
        this._onBuySignal({ price, time });
      },
      onSellSignal: ({ price, time, amount, position }) => {
        this._onSellSignal({ price, time, amount, position });
      }
    });

    const tasks = historicalData.map((stick: CandleStick, index: number) => {
      const candleSticks = historicalData.slice(0, index + 1);
      const time = stick.openTime;
      return this.strategy.run({ candleSticks, time });
    });

    await Promise.all(tasks);

    const positions = this.strategy.getPositions();
    positions.forEach((p) => p.print());

    const total = positions.reduce((sum, p) => sum + p.profit(), 0);

    const colored = total > 0 ? green(`${total}`) : red(`${total}`);
    console.log(`Total Profit: ${colored}`);
  }

  async _onBuySignal({ price, time }: BuySignalData) {
    const id = genRandomString();
    const amount = 1;
    this.strategy.positionOpened({ price, time, amount, id });
  }

  async _onSellSignal({ price, time, amount, position }: SellSignalData) {
    const id = position.id;
    this.strategy.positionClosed({ price, time, amount, id });
  }
}

export default BackTester;
