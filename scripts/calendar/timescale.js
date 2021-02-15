import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  // +- ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // + полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
  // ============ start ==============
  const getGreenwichTime = date => {
    const formatter = new Intl.DateTimeFormat('en', {
      // timeZone: 'UTC',
      hour: 'numeric',
      hour12: true,
    });
    return formatter.format(date);
  };

  const calendarTimeScaleElem = document.querySelector('.calendar__time-scale');

  calendarTimeScaleElem.innerHTML = createNumbersArray(0, 24)
    .map(
      num =>
        `<div data-hour="${num}" class="time-slot">
				   <span
					 	data-time-slot-time="${num}" 
						class="time-slot__time">${getGreenwichTime(new Date().setHours(num))}</span>
		     </div>`,
    )
    .join('');
};
