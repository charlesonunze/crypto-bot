import { genRandomString } from '../utils';
import { BuySignalData, SellSignalData } from '../types';
import Runner from '../runner';

class BackTester extends Runner {
  async start() {
    const historicalData = await this.historicalService.getData();

    const tasks = historicalData.map((stick, index) => {
      const candleSticks = historicalData.slice(0, index + 1);
      const time = stick.openTime;
      return this.strategy.run({ candleSticks, time });
    });

    await Promise.all(tasks);

    this.printPosition();
    this.printProfit();
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
