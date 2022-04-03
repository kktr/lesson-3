import { subtract } from './utilities/subtract';
import { generateTypes } from './test-utils/generateTypes';
import { ExchangeRates } from './types/ExchangeRates';
import { CalculateRateDifference } from './types/CalculateRateDifference';
import nock from 'nock';
import { NODATA } from 'dns';

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

describe('currenciesApi', () => {
  it('works', async () => {
    // get caller path npm

    // nock.disableNetConnect();
    // nagrywanie najpierw tylko
    // odtwarzanie
    // internet
    nock.recorder.rec();
    // nock.recorder.rec({ dont_print: true, output_objects: true });
    nock.load(`/Users/krystiankat/Documents/lesson-3/src/exchangeRates.json`);

    const response = await fetch(
      'https://api.nbp.pl/api/exchangerates/rates/a/usd/2022-03-10/?format=json'
    );

    const data = (await response.json()) as ExchangeRates;

    expect(data.rates[0].mid).toBe(4.3482);

    // nock.enableNetConnect();
    nock.recorder.play();
  });
});

// 4.2403
