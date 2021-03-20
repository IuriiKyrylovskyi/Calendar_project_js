const baseUrl = 'https://6053a1fc45e4b300172921fc.mockapi.io/events';

// const mapevents = events => events.map(({ _id, ...rest }) => ({ ...rest, id: _id }));

const alertMessage = () => alert('Internal Server Error');

export const getEventsList = () => {
  return fetch(baseUrl)
    .then((response, reject) => {
      if (!response.ok) reject(response);
      return response.json();
    })
    .catch(() => new Error(alertMessage()));
};

// export const getEvent = eventId => {
//   return fetch(`${baseUrl}/${eventId}`)
//     .then((response, reject) => {
//       if (!response.ok) reject(response);
//       return response.json();
//     })
//     .catch(() => new Error(alertMessage()));
// };
// // .then(events => mapevents(events));

export const createEvent = eventData => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  })
    // .then((response, reject) => {
    //   if (!response.ok) reject(response);
    //   return response.json();
    // })
    // .catch(() => new Error(alertMessage()));
};

// export const updateEvent = (eventId, updatedEventData) => {
//   return fetch(`${baseUrl}/${eventId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify(updatedEventData),
//   });
// };

export const deleteEvent = eventId => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  });
};
