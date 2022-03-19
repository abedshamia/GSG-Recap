const calc = (num1, num2, operator) => {
  switch (operator) {
    case 'add':
      return num1 + num2;
      break;
    case 'substract':
      return num1 - num2;
      break;
    case 'times':
      return num1 * num2;
      break;
    case 'divide':
      return +(num1 / num2).toFixed(3);
      break;
    default:
      return 'Error';
  }
};

module.exports = calc;
