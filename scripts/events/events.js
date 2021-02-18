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
  eventElem.setAttribute('data-event-id', Date.now());
  eventElem.style.top = '20px'; // let
  eventElem.style.height = '100px'; // let
  eventElem.style.position = 'absolute'; // for check ----

  const eventTitleElem = document.createElement('div');
  eventTitleElem.classList.add('event__title');
  eventTitleElem.textContent = 'Code'; // let

  const eventTimeElem = document.createElement('div');
  eventTimeElem.classList.add('event__time');
  eventTimeElem.textContent = `12 - 'event.end'`; // let
  // eventTimeElem.textContent = '3:15 - 6:30'; // let

  eventElem.append(eventTitleElem);
  eventElem.append(eventTimeElem);

  return eventElem;
};

export const renderEvents = () => {
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых

  const events = getItem('events');
  const mondayDate = new Date(getItem('displayedWeekStart')); // .getDate

  const getEventsByDate = events.filter(
    event =>
      // console.log(new Date(dayDate.start).getDay(), new Date(mondayDate)),
      new Date(event.start - mondayDate).getDay() <= 6 &&
      (event.start - mondayDate >= 0) / (1000 * 60 * 60 * 24),
  );

  console.log(getEventsByDate);
  // const calendarTimeSlotTimeElem = calendarTimeSlotElem.dataset.time;

  const getEventsByTime = getEventsByDate.map(event => {
    const calendarTimeSlotElem = document.querySelector(
      // '.calendar__time-slot[data-time="' + new Date(event.start).getHours() + '"]',
      `.calendar__time-slot[data-time="${new Date(event.start).getHours()}"]`,
    );
    calendarTimeSlotElem.append(createEventElement(event));
    // calendarTimeSlotElem.innerHTML = createEventElement(event);
    // calendarTimeSlotElem;
    console.log(calendarTimeSlotElem);
  });
  // console.log(getEventsByTime);

  const currentDateEl = document.querySelector(
    `.calendar__day-label.day-label[data-time="${new Date(Date.now()).getDate()}"]`,
  );
  console.log(currentDateEl);
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
