import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
// import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const generateDay = dayNum => {
  // +- функция должна сгенерировать и вернуть разметку дня в виде строки
  // + разметка состоит из 24 часовых временных слотов (.calendar__time-slot)

  const calendarDayElem = document.createElement('div');
  calendarDayElem.classList.add('calendar__day');
  calendarDayElem.setAttribute('data-day', dayNum);
  calendarDayElem.innerHTML = createNumbersArray(0, 24)
    .map(num => `<div data-time="${num}" class="calendar__time-slot"></div>`)
    .join('');

  return calendarDayElem;
};

export const renderWeek = () => {
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents

  const calendarWeekElem = document.querySelector('.calendar__week');
  // const generateDayElem = generateDay();
  // console.log(generateDayElem);

  const startDate = getItem(displayedWeekStart);
  console.log(startDate);

  calendarWeekElem.innerHTML = generateWeekRange(startDate)
    .map(dayNum => generateDay(dayNum))
    // .map(dayNum => generateDayElem.setAttribute('data-day', dayNum))
    // .map(dayNum =>
    //   generateDayElem.replace(
    //     `<div class="calendar__day"`,
    //     `<div data-day="${dayNum}" class="calendar__day"`,
    //   ),
    // )
    .join('');

  // return
};
renderWeek();
console.log(renderWeek());
