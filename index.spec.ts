import { getExchangeRate, setExchangeRate } from './index'

test('Курс EUR <-> USD', () => {
  setExchangeRate('EUR', 'USD', 1.25);
  expect(getExchangeRate('EUR', 'USD')).toBe(1.25);
  expect(getExchangeRate('USD', 'EUR')).toBe(0.8);
});

test('Несуществующий урс EUR <-> AUD', () => {
  expect(getExchangeRate('EUR', 'AUD')).toBe(0);
  expect(getExchangeRate('AUD', 'EUR')).toBe(0);
});

test('Непрямой курс EUR <-> CAD', () => {
  setExchangeRate('USD', 'CAD', 1.34);
  expect(getExchangeRate('EUR', 'CAD')).toBe(1.675);
  expect(getExchangeRate('CAD', 'EUR')).toBe(0.597);
});

test('Прямой курс EUR <-> CAD (в приоритете)', () => {
  setExchangeRate('EUR', 'CAD', 1.7);
  expect(getExchangeRate('EUR', 'CAD')).toBe(1.7);
  expect(getExchangeRate('CAD', 'EUR')).toBe(0.588);
});
