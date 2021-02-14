import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
  // ============ start ==============
  const calendarTimeScaleElem = document.querySelector('.calendar__time-scale');

  // const timeScaleElem = document.createElement('div');
  // timeScaleElem.classList.add('time-slot');
  // const timeSlotElem = document.createElement('span');
  // timeSlotElem.classList.add('time-slot__time');
  // const timeScale = timeScaleElem.append(timeSlotElem);

  // calendarTimeScaleElem.innerHTML = timeScale;

	calendarTimeScaleElem.innerHTML = createNumbersArray(0, 24)
		.map(num => `<div class="time-slot"><span class="time-slot__time">${num}</span></div>`)
		.join('');

  // listItemElem.append(checkbox, text);

  // return calendarTimeScaleElem;

  // listElem.append(...tasksElems);
};

renderTimescale();
