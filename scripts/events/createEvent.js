import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
  // ф-ция должна очистить поля формы от значений
  eventFormElem.querySelector('[name="title"]').value = 'Title';
  eventFormElem.querySelector('[name="description"]').value = 'Add description';
  eventFormElem.querySelector('[name="date"]').value = null; // new Date(Date.now()).getFullYear();
  eventFormElem.querySelector('[name="startTime"]').value = '';
  eventFormElem.querySelector('[name="endTime"]').value = '';
}

function onCloseEventForm() {
  // здесь нужно закрыть модальное окно и очистить форму
  closeModal();
  clearEventForm();
}

function onCreateEvent(event) {
  // + задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // + создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // + при подтверждении формы нужно считать данные с формы
  // + с формы вы получите поля date, startTime, endTime, title, description
  // +? на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // +? date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // + полученное событие добавляем в массив событий, что хранится в storage
  // + закрываем форму
  // + и запускаем перерисовку событий с помощью renderEvents

  if (event.target !== eventFormElem.querySelector('[type="submit"]')) {
    return;
  }

  const newEvent = {
    id: Date.now(),
    title: eventFormElem.querySelector('[name="title"]').value,
    description: eventFormElem.querySelector('[name="description"]').value,
    start: getDateTime(
      eventFormElem.querySelector('[name="date"]').value,
      eventFormElem.querySelector('[name="startTime"]').value,
    ),
    end: getDateTime(
      eventFormElem.querySelector('[name="date"]').value,
      eventFormElem.querySelector('[name="endTime"]').value,
    ),
  };
  console.log(newEvent);
  const eventsArr = getItem('events');
  console.log(eventsArr);
  console.log(typeof eventsArr);

	const newArr = eventsArr.push(newEvent);
  setItem('events', newArr);

  onCloseEventForm();

  renderEvents();
}

export function initEventForm() {
  // +? подпишитесь на сабмит формы и на закрытие формы
	
  // console.log(eventFormElem.querySelector('[type="submit"]'));
  // console.log(closeEventFormBtn);

  eventFormElem.querySelector('[type="submit"]').addEventListener('click', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
