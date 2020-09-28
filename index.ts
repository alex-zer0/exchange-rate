const STORE: {[key: string]: { [key: string]: number }} = {};

// Округление до десятичных знаков
const roundToDigits = (result: number, digits = 3): number => {
  const multiplier = 10 ** digits;
  return Math.round(result * multiplier) / multiplier;
};

// Сохранение курса пары валют
const saveExchangeRate = (firstCurrency: string, secondCurrency: string, exchangeRate: number): void => {
  if (STORE[firstCurrency]) {
    STORE[firstCurrency][secondCurrency] = exchangeRate;
  } else {
    STORE[firstCurrency] = { [secondCurrency]: exchangeRate };
  }
};

// Поиск промежуточной валюты и расчет курса
const getLongPathExchangeRate = (firstCurrency: string, secondCurrency: string): number => {
  const currency = Object.keys(STORE[secondCurrency]).find(key => !!STORE[firstCurrency][key]);
  return currency ? roundToDigits(STORE[firstCurrency][currency] * STORE[currency][secondCurrency]) : 0;
}

// Задаем курс пары валют (и в обратном порядке)
const setExchangeRate = (firstCurrency: string, secondCurrency: string, exchangeRate: number): void => {
  saveExchangeRate(firstCurrency, secondCurrency, exchangeRate);
  saveExchangeRate(secondCurrency, firstCurrency, roundToDigits(1 / exchangeRate));
};

// Получаем курс пары валют
const getExchangeRate = (firstCurrency: string, secondCurrency: string): number => {
  if (STORE[firstCurrency] && STORE[secondCurrency]) {
    return STORE[firstCurrency][secondCurrency] || getLongPathExchangeRate(firstCurrency, secondCurrency);
  }
  return 0;
};

export {
  setExchangeRate,
  getExchangeRate
}
