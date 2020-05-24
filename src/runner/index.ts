import Strategy from '../strategies/strategy';
import { green, red } from 'colors';
import { BuySignalData, SellSignalData, RunnerData } from '../types';
import Factory from '../strategies/factory';
import HistoricalService from '../services/historical';

abstract class Runner {
  strategy!: Strategy;
  historicalService: HistoricalService;

  constructor({ startTime, strategy }: RunnerData) {
    this.strategy = Factory.create(strategy, {
      onBuySignal: ({ price, time }) => {
        this._onBuySignal({ price, time });
      },
      onSellSignal: ({ price, time, amount, position }) => {
        this._onSellSignal({ price, time, amount, position });
      }
    });

    this.historicalService = new HistoricalService(startTime);
  }

  printPosition() {
    const positions = this.strategy.getPositions();
    positions.forEach((p) => {
      p.print();
    });
  }

  printProfit() {
    const positions = this.strategy.getPositions();
    positions.forEach((p) => p.print());
    const total = positions.reduce((sum, p) => sum + p.profit(), 0);
    const colored = total > 0 ? green(`${total}`) : red(`${total}`);
    console.log(`Total Profit: ${colored}`);
  }

  abstract async start(startTime: string): Promise<void>;
  abstract async _onBuySignal(data: BuySignalData): Promise<void>;
  abstract async _onSellSignal(data: SellSignalData): Promise<void>;
}

export default Runner;
