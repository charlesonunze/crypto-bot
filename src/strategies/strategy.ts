import Trade from '../models/trade';
import Position from '../models/position';
import {
	onBuySignal,
	onSellSignal,
	BuySignal,
	CandleStick,
	Positions,
} from '../types';

abstract class Strategy {
	positions: Positions;
	onBuySignal: onBuySignal;
	onSellSignal: onSellSignal;

	constructor({ onBuySignal, onSellSignal }: BuySignal) {
		this.positions = {};
		this.onBuySignal = onBuySignal;
		this.onSellSignal = onSellSignal;
	}

	abstract async run(candleSticks: CandleStick[], time: number): Promise<void>;

	getPositions() {
		return Object.keys(this.positions).map((k) => this.positions[k]);
	}

	getOpenPositions() {
		return this.getPositions().filter((p) => p.state === 'open');
	}

	async positionOpened(
		price: number,
		time: number,
		amount: number,
		id: string,
	) {
		const trade = new Trade(price, time, amount);
		const position = new Position(trade, id);
		this.positions[id] = position;
	}

	async positionClosed(
		price: number,
		time: number,
		amount: number,
		id: string,
	) {
		const trade = new Trade(price, time, amount);
		const position = this.positions[id];
		if (position) position.close(trade);
	}
}

export default Strategy;
