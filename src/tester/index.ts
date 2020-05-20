import HistoricalService from '../services/historical';
import { SimpleStrategy } from '../strategies';
import { genRandomString } from '../utils';
import { red, green } from 'colors';
import Strategy from '../strategies/strategy';
import { CandleStick } from '../types';
import Position from '../models/position';
import SimpleMACD from '../strategies/simpleMACD';

class BackTester {
  strategy!: Strategy;

  async start() {
    const historicalData: CandleStick[] = await HistoricalService.getData();

    this.strategy = new SimpleMACD({
      onBuySignal: (price: number, time: number) => {
        this._onBuySignal(price, time);
      },

      onSellSignal: (
        price: number,
        time: number,
        amount: number,
        position: Position
      ) => {
        this._onSellSignal(price, time, amount, position);
      },
    });

    const tasks = historicalData.map((stick: CandleStick, index: number) => {
      const sticks = historicalData.slice(0, index + 1);
      return this.strategy.run(sticks, stick.openTime);
    });

    await Promise.all(tasks);

    const positions = this.strategy.getPositions();
    positions.forEach((p) => p.print());

    const total = positions.reduce((sum, p) => sum + p.profit(), 0);

    const colored = total > 0 ? green(`${total}`) : red(`${total}`);
    console.log(`Total Profit: ${colored}`);
  }

  async _onBuySignal(price: number, time: number) {
    const id = genRandomString();
    const amount = 1;
    this.strategy.positionOpened(price, time, amount, id);
  }

  async _onSellSignal(
    price: number,
    time: number,
    amount: number,
    position: Position
  ) {
    this.strategy.positionClosed(price, time, amount, position.id);
  }
}

export default BackTester;
