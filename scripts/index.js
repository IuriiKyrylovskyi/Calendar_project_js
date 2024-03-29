import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';

import { renderEvents } from './events/events.js';
import { getEventsList } from './ajax/eventsGateway.js';

const onStorageChange = e => {
  if (e.key === 'events' || e.key === 'bgColor') {
    renderEvents();
    // console.log(e.key);
  }
};
window.addEventListener('storage', onStorageChange);

document.addEventListener('DOMContentLoaded', () => {
  // инициализация всех элементов
  renderTimescale();
  setItem('displayedWeekStart', getStartOfWeek(new Date()));
  renderWeek();
  renderHeader();
  initNavigation();
  initEventForm();
  getEventsList().then(eventsList => {
    setItem('events', eventsList);
    renderEvents();
  });
});
