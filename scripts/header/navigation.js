import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

function renderCurrentMonth() {
  // + отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // + вставить в .navigation__displayed-month

  const currentMonth = getDisplayedMonth(getItem('displayedWeekStart'));
  // console.log(currentMonth);
  // console.log(getItem('displayedWeekStart'));

  displayedMonthElem.textContent = currentMonth;
  // console.log(displayedMonthElem);
}

const onChangeWeek = event => {
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)

  const isButton = event.target.closest('button');
  // const date = new Date();
  const startOfWeek = getStartOfWeek(getItem('displayedWeekStart'));

  if (!isButton) {
    console.log(getItem('displayedWeekStart'));
    console.log(startOfWeek.getDate());
    return;
  }
  if (isButton.dataset.direction === 'next') {
    const nextWeek = startOfWeek.getDate() + 7;
    console.log(nextWeek); // 22
    setItem('displayedWeekStart', new Date().setDate(nextWeek));
    getItem('displayedWeekStart');
    // console.log(setItem('displayedWeekStart'));
  } else if (isButton.dataset.direction === 'prev') {
    console.log('prev');
  } else if (isButton.dataset.direction === 'today') {
    // date = Date.now().getDate();
    // console.log(getStartOfWeek(Date.now()));

    setItem('displayedWeekStart', getStartOfWeek(Date.now()));
    console.log('today');
  }
  // console.log('btn');
  renderHeader();
  renderWeek();
  renderCurrentMonth();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
