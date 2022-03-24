import { subtract } from './utilities/subtract';
import { generateTypes } from './test-utils/generateTypes';
import { ExchangeRates } from './types/ExchangeRates';

test.skip('creates exchange rate types', async () => {
  await generateTypes(
    'http://api.nbp.pl/api/exchangerates/rates/a/chf/?format=json',
    'ExchangeRates'
  );
});

test.skip('creates github types', async () => {
  await generateTypes('https://api.github.com/users/github', 'GithubUser');
});

const fakeExchangeRates1: ExchangeRates = {
  table: 'C',
  currency: 'dolar amerykański',
  code: 'USD',
  rates: [
    {
      no: '064/C/NBP/2016',
      effectiveDate: '2016-04-04',
      mid: 4.6412,
    },
  ],
};

const fakeExchangeRates2: ExchangeRates = {
  table: 'C',
  currency: 'dolar amerykański',
  code: 'USD',
  rates: [
    {
      no: '064/C/NBP/2016',
      effectiveDate: '2016-04-04',
      mid: 4.3412,
    },
  ],
};

type CalculateRateDifference = (
  data1: ExchangeRates,
  data2: ExchangeRates
) => number;

const calculateRateDifference: CalculateRateDifference = (data1, data2) => {
  const exchangeRates1 = data1.rates[0].mid;
  const exchangeRates2 = data2.rates[0].mid;

  return subtract(exchangeRates2, exchangeRates1);
};

test('calculate rates', async () => {
  expect(calculateRateDifference(fakeExchangeRates1, fakeExchangeRates2)).toBe(
    -0.3
  );
});
