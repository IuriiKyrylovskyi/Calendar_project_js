const generateWeekRange = startDate => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

console.log(generateWeekRange(Date.now()));

let storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: new Date(2020, 2, 16), //null,
  // хранит массив всех событий
  events: [],
  // это все данные, которые вам нужно хранить для работы приложения
};
console.log(storage.displayedWeekStart); // 2020-03-15T22:00:00.000Z

const startDate = new Date(2020, 2, 16);
const currentWeekDays = generateWeekRange(startDate);

console.log(currentWeekDays);

const createNumbersArray = (from, to) => {
  // ф-ция должна генерировать массив чисел от from до to
  const numbers = [];
  for (let i = from; i < to; i++) {
    numbers.push(i);
  }
  return numbers;
};

const generateDay = () => {
  // + функция должна сгенерировать и вернуть разметку дня в виде строки
  // + разметка состоит из 24 часовых временных слотов (.calendar__time-slot)

  const calendarDayElem = document.createElement('div');
  calendarDayElem.classList.add('calendar__day');
  calendarDayElem.innerHTML = createNumbersArray(0, 24)
    .map(num => `<div data-calendar-time-slot="${num}" class="calendar__time-slot"></div>`)
    .join('');
};
console.log(generateDay());
// const renderWeek = () => {
//   // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
//   // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
//   // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
//   // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
//   // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents

//   const calendarWeekElem = document.querySelector('.calendar__week');
//   const generateDayElem = generateDay();

//   calendarWeekElem.innerHTML = generateWeekRange(Date.now())
//     .map(dayNum => generateDayElem + dayNum)
//     // .map(dayNum => generateDayElem.setAttribute('data-day-number', dayNum))
//     // .map(dayNum =>
//     //   generateDayElem.replace(
//     //     `<div class="calendar__day"`,
//     //     `<div data-day-num="${dayNum}" class="calendar__day"`,
//     //   ),
//     // )
//     .join('');
// };
