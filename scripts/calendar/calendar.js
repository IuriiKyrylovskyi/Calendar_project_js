import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

let timeLineInterval = null;

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

const renderTimeLine = () => {
  const getCurrentTime = new Date();
  const startDate = getItem('displayedWeekStart');
  // console.log(startDate);
  // console.log(startDate.getFullYear());
  const currentWeekDays = generateWeekRange(startDate);
  console.log(getCurrentTime.toLocaleDateString());
  const getCurrentDate = () =>
    currentWeekDays.filter(day => day.toLocaleDateString() === getCurrentTime.toLocaleDateString());
  console.log(getCurrentDate());

  if (getCurrentDate().length === 0) {
    // console.log('false');
    return;
  }
  // console.log('true');
  const weekElem = document.querySelector('.calendar__week');
  const currentDate = weekElem.querySelector(`[data-day="${getCurrentTime.getDate()}"]`);
  if (!currentDate) {
    return;
  }
  const currentHour = currentDate.querySelector(`[data-time="${getCurrentTime.getHours()}"]`);

  const timeLineElem = `<div class="current-time" style="top:${getCurrentTime.getMinutes()}px;"></div>`;

  currentHour.innerHTML = timeLineElem;
  // console.log(currentHour);
  return currentHour;
};

const timeLineTimeOut = () => {
  const secondsToMin = 60 - new Date().getSeconds();
  // console.log(secondsToMin);
  setTimeout(() => {
    renderTimeLine();
    timeLineInterval = setInterval(renderTimeLine, 60000);
  }, secondsToMin * 1000);
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
  // console.log(startDate);

  const currentWeekDays = generateWeekRange(startDate);
  // console.log(currentWeekDays);

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

  if (timeLineInterval) {
    clearInterval(timeLineInterval);
  }
  timeLineTimeOut();
};
