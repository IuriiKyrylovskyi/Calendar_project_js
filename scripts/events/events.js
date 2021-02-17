import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
// import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
}

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря
  // setItem('events', []);
}

const createEventElement = event => {
  // + ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // + нужно добавить id события в дата атрибут
  // + здесь для создания DOM элемента события используйте document.createElement

  const eventElem = document.createElement('div');
  eventElem.classList.add('event');
  eventElem.setAttribute('data-event-id');
  eventElem.dataset.eventId = Date.now();
  eventElem.style.top = '10px'; // let
  eventElem.style.height = '200px'; // let

  const eventTitleElem = document.createElement('div');
  eventTitleElem.classList.add('event__title');
  eventTitleElem.textContent = 'Code'; // let

  const eventTimeElem = document.createElement('div');
  eventTimeElem.classList.add('event__time');
  eventTimeElem.textContent = '3:15 - 6:30'; // let

  eventElem.append(eventTitleElem);
  eventElem.append(eventTimeElem);
};

export const renderEvents = () => {
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // + для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых

  const events = getItem('events');
  const mondayDate = new Date(getItem('displayedWeekStart')); // .getDate

  const getWeekEvents = () => {
    events.filter(
      dayDate =>
        dayDate.start.getDate() - mondayDate.getDate() <= 6 &&
        dayDate.start.getDate() - mondayDate.getDate() >= 0,
    );
  };

  createEventElement(getWeekEvents);

  const calendarTimeSlotElems = document.querySelectorAll('.calendar__time-slot');

  const calendarTimeSlotElem = () => calendarTimeSlotElems.map(elem => elem);

  if (weekElem.closest.dataset.dataDay === calendarTimeSlotElem.dataTime) {
    this.append(calendarTimeSlotElem);
  }
};

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)

  const events = getItem('events');

  const deleteEvent = eventIdToDelete =>
    events.filter(event => event.eventIdToDelete !== eventIdToDelete);

  setItem('events', deleteEvent);

  // popup classList.add('hidden')
  // renderEvents()
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
