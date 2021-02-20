import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage

  // const clickedEvent = event.target.classList.contains('event');
  const clickedEvent = weekElem.querySelector('.event');
  if (clickedEvent) {
    openPopup(event.clientX, event.clientY);
    const eventIdToDelete = Date.now();
    console.log(event);

    console.log(clickedEvent.dataset.eventId);
    console.log(typeof clickedEvent.dataset.eventId);

    const events = getItem('events');
    events.map(ev => {
      console.log(ev.id);
      if (ev.id !== +clickedEvent.dataset.eventId) {
        return;
      }
      ev.eventIdToDelete = eventIdToDelete;
    });
    console.log(events);

    // setItem('events', idToDelElem);
  }
}

function removeEventsFromCalendar() {
  // + ф-ция для удаления всех событий с календаря
  const eventsFronCalendar = document.querySelectorAll('.event');
  eventsFronCalendar.forEach(event => event.remove());
}

const createEventElement = event => {
  // + ф-ция создает DOM элемент события
  // + событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // + нужно добавить id события в дата атрибут
  // + здесь для создания DOM элемента события используйте document.createElement

  const eventElem = document.createElement('div');
  eventElem.classList.add('event');
  eventElem.setAttribute('data-event-id', event.id);
  // eventElem.style.position = 'absolute'; // for check ----
  eventElem.style.top = `${new Date(event.start).getMinutes()}px`; // let
  console.log(eventElem.style.height);
  const eventHight =
    (new Date(event.end).getHours() - new Date(event.start).getHours()) * 60 +
    new Date(event.end).getMinutes() -
    new Date(event.start).getMinutes();

  console.log(eventHight);
  if (eventHight) {
    eventElem.style.height = `${eventHight}px`; // let
  }
  // eventElem.style.height = shmoment((event.start).substract()); //, new Date(event.end)); // 100px'; // let
  // console.log(eventElem.style.height);

  const eventTitleElem = document.createElement('div');
  eventTitleElem.classList.add('event__title');
  eventTitleElem.textContent = event.title; // 'Code';

  const eventTimeElem = document.createElement('div');
  eventTimeElem.classList.add('event__time');
  eventTimeElem.textContent = `
		${new Date(event.start).getHours()}:
		${new Date(event.start).getMinutes()} - 
		${new Date(event.end).getHours()}:
		${new Date(event.end).getMinutes()}
		`;
  // console.log(eventTimeElem);

  eventElem.append(eventTitleElem);
  eventElem.append(eventTimeElem);

  return eventElem;
};

export const renderEvents = () => {
  // + достаем из storage все события и дату понедельника отображаемой недели
  // + фильтруем события, оставляем только те, что входят в текущую неделю
  // + создаем для них DOM элементы с помощью createEventElement
  // + для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // + и вставляем туда событие
  // + каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // + не забудьте удалить с календаря старые события перед добавлением новых

  removeEventsFromCalendar();

  const events = getItem('events');
  const mondayDate = new Date(getItem('displayedWeekStart')); // .getDate

  // console.log(events);

  events
    .filter(
      event =>
        // console.log(new Date(dayDate.start).getDay(), new Date(mondayDate)),
        new Date(event.start).getMonth() === new Date(mondayDate).getMonth() &&
        new Date(event.start - mondayDate).getDate() <= 7 &&
        new Date(event.start - mondayDate).getHours() >= 0, // ) / (1000 * 60 * 60 * 24),
      // (event.start - mondayDate >= 0) / (1000 * 60 * 60 * 24),
    )
    .map(el => {
      const elem = createEventElement(el);
      const date = weekElem.querySelector(`[data-day="${new Date(el.start).getDate()}"]`);
      if (date) {
        date.querySelector(`[data-time="${new Date(el.start).getHours()}"]`).append(elem);
      }
      return date;
    });
};

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
  // const events = getItem('events');
  // const deleteEvent = eventIdToDelete =>
  //   events.filter(event => event.eventIdToDelete !== eventIdToDelete);
  // setItem('events', deleteEvent);
  // popup classList.add('hidden')
  // renderEvents()
}

deleteEventBtn.addEventListener('submit', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
