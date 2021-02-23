import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const generateDay = () => {
  // + функция должна сгенерировать и вернуть разметку дня в виде строки
  // + разметка состоит из 24 часовых временных слотов (.calendar__time-slot)

  const calendarDayElem = document.createElement('div');
  calendarDayElem.classList.add('calendar__day');
  // calendarDayElem.setAttribute('data-day', dayNum);
  calendarDayElem.innerHTML = createNumbersArray(0, 24)
    .map(num => `<div data-time="${num}" class="calendar__time-slot"></div>`)
    .join('');

  // console.log(calendarDayElem);
  return calendarDayElem;
};

// const createTimeLine = () => {
//   const timeLineElem = document.createElement('div');
//   timeLineElem.classList.add = 'current-time';
//   // timeLineElem.style.position = 'absolute';
//   // timeLineElem.style.top = '0px'; //'1px'; // getMinutes
//   // timeLineElem.style.width = '100%';
//   // timeLineElem.style.height = '1px';
//   // timeLineElem.style.backgroundColor = 'red';
//   console.log(timeLineElem);

//   return timeLineElem;
// };

const renderTimeLine = () => {
  const getCurrentTime = new Date();
  const weekElem = document.querySelector('.calendar__week');
  const currentDate = weekElem.querySelector(`[data-day="${getCurrentTime.getDate()}"]`);
  const currentHour = currentDate.querySelector(`[data-time="${getCurrentTime.getHours()}"]`);

  // console.log(createTimeLine.style.top);
  const timeLineElem = '<div class="current-time"></div>';

  // createTimeLine.style.top = `${getCurrentTime.getMinutes()}px`;

  currentHour.innerHTML = timeLineElem;
  console.log(currentHour);
  return currentHour;
};

const currentTime = () => {
  const currentTimeLine = document.querySelector('current-time');
  currentTimeLine.style.top = `${new Date().getMinutes().toString()}px`;
};

export const renderWeek = () => {
  // + функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // + разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // + массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // + каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // + после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents

  // console.log(typeof generateDay());
  const calendarWeekElem = document.querySelector('.calendar__week');

  const startDate = getItem('displayedWeekStart');
  console.log(startDate);

  const currentWeekDays = generateWeekRange(startDate);
  console.log(currentWeekDays);

  calendarWeekElem.innerHTML = currentWeekDays
    .map(dayNum => {
      const day = generateDay();
      day.setAttribute('data-day', dayNum.getDate());
      return day.outerHTML;
    })
    // .map(dayNum =>
    // 	generateDay().outerHTML
    // 		.replace(
    //     `<div class="calendar__day"`,
    //     `<div data-day="${dayNum.getDay()}" class="calendar__day"`,
    //   ),
    // )
    .join('');

  renderEvents();
  renderTimeLine();
  console.log(new Date().getMinutes().toString());
  setInterval(currentTime, 6000);
};
