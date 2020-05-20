import Trade from './trade';
import { red, green } from 'colors';
import { PositionState } from '../types';

class Position {
  state: PositionState;
  enter: Trade;
  exit!: Trade;

  constructor(public trade: Trade, public id: string) {
    this.id = id;
    this.state = 'open';
    this.enter = trade;
  }

  close(trade: Trade) {
    this.state = 'closed';
    this.exit = trade;
  }

  print() {
    const enter = `Enter Price: | ${this.enter.price} Enter Time: | ${this.enter.time}`;
    const exit = this.exit
      ? `Exit Price: | ${this.exit.price}  Exit Time: | ${this.exit.time}`
      : '';

    let profit = '';
    if (this.state === 'closed') {
      const prof = `${this.profitString()}`;
      const colored = this.profit() > 0 ? green(prof) : red(prof);
      profit = `Profit: ${colored}`;
    }

    console.log(`${enter}`);
    console.log(`${exit}`);
    console.log(`${profit}`);
    console.log('------------------------------');
  }

  profit() {
    const fee = 0.0025;
    const entrance = this.enter.price * (1 + fee);
    if (this.exit) {
      const exit = this.exit.price * (1 - fee);
      return exit - entrance;
    } else {
      return 0;
    }
  }

  profitString() {
    return this.profit().toFixed(2);
  }
}

export default Position;
