import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
  if (event.target !== weekElem.querySelector('.event')) {
    return;
  }
  openPopup();
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

  // const calendarDayTimeSlotElem = weekElem.querySelector('.calendar__time-slot');
  // // if (event.target !== calendarDayTimeSlotElem) {
  // //   return;
  // // }

  // const createdElem = getItem('events').filter(
  //   el =>
  //     el.start.getDate() === calendarDayTimeSlotElem.closest('.calendar__day').dataset.day &&
  //     el.start.getHours() === calendarDayTimeSlotElem.dataset.time,
  // );

  const eventElem = document.createElement('div');
  eventElem.classList.add('event');
  eventElem.setAttribute('data-event-id', event.id);
  eventElem.style.position = 'absolute'; // for check ----
  eventElem.style.top = `${new Date(event.start).getMinutes()}px`; // let
  console.log(eventElem.style.height);
  // eventElem.style.height = shmoment(new Date(event.start)); //, new Date(event.end)); // 100px'; // let
  // console.log(eventElem.style.height);

  const eventTitleElem = document.createElement('div');
  eventTitleElem.classList.add('event__title');
  eventTitleElem.textContent = event.title; // 'Code'; // let

  const eventTimeElem = document.createElement('div');
  eventTimeElem.classList.add('event__time');
  eventTimeElem.textContent = `
	${new Date(event.start).getHours()}:
	${new Date(event.start).getMinutes()} - 
	${new Date(event.end).getHours()}:
	${new Date(event.end).getMinutes()}
	`; // let
  console.log(eventTimeElem);

  // eventTimeElem.textContent = '3:15 - 6:30'; // let

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
  // не забудьте удалить с календаря старые события перед добавлением новых

  const events = getItem('events');
  const mondayDate = new Date(getItem('displayedWeekStart')); // .getDate
  // console.log(Array.from(events));
  // console.log(typeof Array.from(events));

  const getEventsByDate = events.filter(
    event =>
      // console.log(new Date(dayDate.start).getDay(), new Date(mondayDate)),
      new Date(event.start - mondayDate).getDay() <= 6 &&
      (event.start - mondayDate >= 0) / (1000 * 60 * 60 * 24),
  );

  // console.log(getEventsByDate);
  // console.log(typeof getEventsByDate);

	// const toHtmlReadyElems =
		getEventsByDate.map(el => {
    const elem = createEventElement(el);
    const date = weekElem.querySelector(`[data-day="${new Date(el.start).getDate()}"]`);
    // console.log(new Date(el.start).getDate());
    // console.log(date);

    // if (date) {
      date.querySelector(`[data-time="${new Date(el.start).getUTCHours()}"]`).append(elem);
    // }
    // return date;
  });
  // console.log(toHtmlReadyElems);
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

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
