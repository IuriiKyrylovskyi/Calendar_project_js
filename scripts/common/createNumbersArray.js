export const createNumbersArray = (from, to) => {
  // + ф-ция должна генерировать массив чисел от from до to
  const numbers = [];
  for (let i = from; i < to; i++) {
    numbers.push(i);
  }
  return numbers;
};

// console.log(createNumbersArray(0, 24));
