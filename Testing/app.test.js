const calc = require('./app');
test('Should return 5', () => {
  expect(calc(3, 2, 'add')).toBe(5);
});

test('Should return 1', () => {
  expect(calc(3, 2, 'substract')).toBe(1);
});

test('Should return -1', () => {
  expect(calc(2, 3, 'substract')).toBe(-1);
});

test('Should return 6', () => {
  expect(calc(3, 2, 'times')).toBe(6);
});

test('Should return 1.5', () => {
  expect(calc(3, 2, 'divide')).toBe(1.5);
});

test('Should return 0.667', () => {
  expect(calc(2, 3, 'divide')).toBe(0.667);
});

test('Should return Error', () => {
  expect(calc(3, 2, 'potato')).toBe('Error');
});
