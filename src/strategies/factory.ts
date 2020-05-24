import { SimpleStrategy } from './index';
import { Signals } from '../types';

class Factory {
  static create(type: string, data: Signals) {
    switch (type) {
      case 'simple':
        return new SimpleStrategy(data);

      default:
        return new SimpleStrategy(data);
    }
  }
}

export default Factory;
