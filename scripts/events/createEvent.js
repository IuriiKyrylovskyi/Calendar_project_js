import { getEvents, setItem } from '../common/storage.js';
import { getEventsList, createEvent } from '../ajax/eventsGateway.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

import shmoment from '../common/shmoment.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
  const getTime = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  // console.log(getTime.format(new Date()));

  // + ф-ция должна очистить поля формы от значений
  eventFormElem.querySelector('[name="title"]').value = 'Title';
  eventFormElem.querySelector('[name="description"]').value = 'Add description';
  eventFormElem.querySelector('[name="date"]').valueAsDate = new Date();
  eventFormElem.querySelector('[name="startTime"]').value = `${getTime.format(new Date())}`;
  eventFormElem.querySelector('[name="endTime"]').value = `${getTime.format(new Date())}`;
}

function onCloseEventForm() {
  // + здесь нужно закрыть модальное окно и очистить форму
  closeModal();
  clearEventForm();
}

function checkEventExist(newEventStart, newEventEnd) {
  const events = getEvents(); 
 
  const eventRange = events.filter(
    event =>
      (event.start <= newEventStart && event.end >= newEventStart) ||
      (event.start <= newEventEnd && event.end >= newEventEnd) ||
      (event.start >= newEventStart && event.end <= newEventEnd),
  );

  // console.log(eventRange.length);
  return eventRange.length;
}

function onCreateEvent(event) {
  // + задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // + создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // + при подтверждении формы нужно считать данные с формы
  // + с формы вы получите поля date, startTime, endTime, title, description
  // + на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // + date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // + полученное событие добавляем в массив событий, что хранится в storage
  // + закрываем форму
  // + и запускаем перерисовку событий с помощью renderEvents

  event.preventDefault();

  const newEvent = {
    // id: Date.now(), //+++
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

  if (checkEventExist(newEvent.start, newEvent.end)) {
    onCloseEventForm();
    return;
  }

  // console.log(+newEvent.start);
  // console.log(+newEvent.end);
  // const eventsArr = getEvents(); // +++++
  // console.log(eventsArr);
  // console.log(typeof eventsArr);
  const maxEventRange = shmoment(newEvent.start).add('hours', 6).result();
  if (+newEvent.start < +newEvent.end && +maxEventRange >= +newEvent.end) {
    // eventsArr.push(newEvent); // +++++
    // console.log(eventsArr);
    createEvent(newEvent)
      .then(() => getEventsList())
      .then(newEventsArr => {
        setItem('events', newEventsArr);
        onCloseEventForm();
        renderEvents();
      });
    // setItem('events', eventsArr); // ++++
  }

  // console.log(getItem('events')); // +++++

  // onCloseEventForm(); // +++++

  // renderEvents();
}

export function initEventForm() {
  // + подпишитесь на сабмит формы и на закрытие формы

  clearEventForm();

  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}

// 1. prepare data -  const newEvent = {}
// 2. write data to db
// 3. read new data from server
// 4. save new data to front-end storage
// 5. update ui based on new data
