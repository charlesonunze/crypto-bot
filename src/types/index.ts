import Position from '../models/position';

export interface CandleStick {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  trades: number;
  takerBaseAssetVolume: string;
  takerQuoteAssetVolume: string;
  ignored: string;
}

export enum CurrencyPair {
  BTC_USD = 'BTCUSDT'
}

export enum CandlestickInterval {
  ONE_MINUTE = '1m',
  THREE_MINUTES = '3m',
  FIVE_MINUTES = '5m',
  FIFTEEN_MINUTES = '15m',
  THIRTY_MINUTES = '30m',
  ONE_HOUR = '1h',
  TWO_HOURS = '2h',
  FOUR_HOURS = '4h',
  SIX_HOURS = '6h',
  EIGHT_HOURS = '8h',
  TWELVE_HOURS = '12h',
  ONE_DAY = '1d',
  THREE_DAYS = '3d',
  ONE_WEEK = '1w',
  ONE_MONTH = '1M'
}

export type onBuySignal = ({}: BuySignalData) => void;

export type onSellSignal = ({}: SellSignalData) => void;

export interface Signals {
  onBuySignal: onBuySignal;
  onSellSignal: onSellSignal;
}

export interface Positions {
  [key: string]: Position;
}

export type PositionState = 'open' | 'closed';

export interface BuySignalData {
  price: number;
  time: number;
}

export interface SellSignalData {
  price: number;
  time: number;
  amount: number;
  position: Position;
}

export interface RunData {
  candleSticks: CandleStick[];
  time: number;
}

export interface PositionData {
  price: number;
  time: number;
  amount: number;
  id: string;
}
