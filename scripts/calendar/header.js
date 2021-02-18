import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderHeader = () => {
  // + на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // + на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // + полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // + в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка (Date)

  const startDate = getItem(['displayedWeekStart']);
  // console.log(startDate);

  const currentWeekDays = generateWeekRange(startDate);

  const calendarHeaderElem = document.querySelector('.calendar__header');

  calendarHeaderElem.innerHTML = currentWeekDays
    .map(
      date =>
        `<div data-day="${new Date(date).getDay()}" class="calendar__day-label day-label">
					<span class="day-label__day-name">${daysOfWeek[new Date(date).getDay()]}</span>
					<span class="day-label__day-number">${new Date(date).getDate()}</span>
				</div>`,
    )
    .join('');
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик

document.querySelector('.create-event-btn').addEventListener('click', openModal);
