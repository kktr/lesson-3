import { ExchangeRates } from './ExchangeRates';

export type CalculateRateDifference = (
  data1: ExchangeRates,
  data2: ExchangeRates
) => number;
