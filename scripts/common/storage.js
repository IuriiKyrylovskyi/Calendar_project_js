let storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null, // new Date(2020, 2, 16), //null,
  // хранит массив всех событий
  events: [
    {
      id: 0.7520027086457333, // id понадобится для работы с событиями
      title: 'Code',
      description: 'something',
      start: new Date('2021-01-19T01:10:00.000Z'),
      end: new Date('2021-01-19T04:30:00.000Z'),
    },
  ],
  // это все данные, которые вам нужно хранить для работы приложения
};

export const setItem = (key, value) => {
  // ф -ция должна устанавливать значения в объект storage
  Object.assign(storage, { [key]: value });
};

export const getItem = key => {
  // ф-ция должна возвращать по ключу значения из объекта storage
  return storage[key];
};

// пример объекта события
const eventExample = {
  id: 0.7520027086457333, // id понадобится для работы с событиями
  title: 'Title',
  description: 'Some description',
  start: new Date('2020-03-17T01:10:00.000Z'),
  end: new Date('2020-03-17T04:30:00.000Z'),
};
