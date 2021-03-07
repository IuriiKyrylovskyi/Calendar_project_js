import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';
import { renderHeader } from '../calendar/header.js';

const navElem = document.querySelector('.navigation');

function renderCurrentMonth() {
	// + отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // + вставить в .navigation__displayed-month
	const displayedMonthElem = document.querySelector('.navigation__displayed-month');

  console.log(getItem('displayedWeekStart'));
  const currentMonth = getDisplayedMonth(getItem('displayedWeekStart'));
  console.log(currentMonth);

  displayedMonthElem.textContent = currentMonth;
  // console.log(displayedMonthElem);
}

const onChangeWeek = event => {
  // + при переключении недели обновите displayedWeekStart в storage
  // + и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)

  const isButton = event.target.closest('button');

  const startOfWeek = getStartOfWeek(getItem('displayedWeekStart'));

  let uploadWeekStart = 0;

  // if (!isButton) {
  //   return;
  // }
  // switch (isButton.dataset.direction) {
  //   case 'next':
  //     uploadWeekStart = startOfWeek.getDate() + 7;
  //     startOfWeek.setDate(uploadWeekStart);
  //     setItem('displayedWeekStart', startOfWeek);
  //     break;
  //   case 'prev':
  //     uploadWeekStart = startOfWeek.getDate() - 7;
  //     startOfWeek.setDate(uploadWeekStart);
  //     setItem('displayedWeekStart', startOfWeek);
  //     break;
  //   case 'today':
  //     setItem('displayedWeekStart', getStartOfWeek(new Date(Date.now())));
  //     break;
  //   default:
  //     break;
  // }

  if (!isButton) {
    return;
  }
  if (isButton.dataset.direction === 'next') {
    uploadWeekStart = startOfWeek.getDate() + 7;
    // console.log(uploadWeekStart); // 22
    startOfWeek.setDate(uploadWeekStart);
    // console.log(startOfWeek);
    setItem('displayedWeekStart', startOfWeek);
    // console.log(getItem('displayedWeekStart'));
  }
  if (isButton.dataset.direction === 'prev') {
    uploadWeekStart = startOfWeek.getDate() - 7;
    // console.log(uploadWeekStart); // 8
    startOfWeek.setDate(uploadWeekStart);
    // console.log(startOfWeek);
    setItem('displayedWeekStart', startOfWeek);
    // console.log(getItem('displayedWeekStart'));
  }
  if (isButton.dataset.direction === 'today') {
    // console.log(new Date(Date.now()).getDate());
    setItem('displayedWeekStart', getStartOfWeek(new Date(Date.now())));
    // console.log(getItem('displayedWeekStart'));
  }
  renderHeader();
  renderWeek();
  renderCurrentMonth();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
