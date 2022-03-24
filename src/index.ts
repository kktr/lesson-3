let { describe, it, test } = global;
import fetch from 'node-fetch';

const {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput,
  FetchingJSONSchemaStore,
} = require('quicktype-core');

async function quicktypeJSON(
  targetLanguage: string,
  typeName: string,
  jsonString: string
) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
    renderOptions: { 'just-types': 'true' },
  });
}

quicktypeJSON(
  'typescript',
  'NewIGetRates',
  `{"table":"A","currency":"dolar amerykański","code":"USD","rates":[{"no":"053/A/NBP/2022","effectiveDate":"2022-03-17","mid":4.2403}]}`
).then((data) => console.log(data));

export interface IGetRates {
  table: string;
  currency: string;
  code: string;
  rates: Rate[];
}
export interface Rate {
  no: string;
  effectiveDate: Date;
  mid: number;
}

const getAvgCourseUSD = () => {
  fetch('http://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json')
    .then((response) => response.json())
    .then(([data]) => data);
};

const getAvgCourseEUR = () => {
  fetch('http://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json')
    .then((response) => response.json())
    .then(([data]) => data);
};

const getAvgCourseUSDWeekAgo = () => {
  fetch(
    'https://api.nbp.pl/api/exchangerates/rates/a/usd/2022-03-17/?format=json'
  )
    .then((response) => response.json())
    .then(([data]) => data);
};

const getAvgCourseEURWeekAgo = () => {
  fetch(
    'https://api.nbp.pl/api/exchangerates/rates/a/eur/2022-03-17/?format=json'
  )
    .then((response) => response.json())
    .then(([data]) => data);
};

test('works', async () => {
  const response = await fetch(
    'http://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json'
  );
  const data = (await response.json()) as IGetRates;

  console.log(data);

  console.log(
    quicktypeJSON(
      'typescript',
      'NewIGetRates',
      `{"table":"A","currency":"dolar amerykański","code":"USD","rates":[{"no":"053/A/NBP/2022","effectiveDate":"2022-03-17","mid":4.2403}]}`
    )
  );
});
