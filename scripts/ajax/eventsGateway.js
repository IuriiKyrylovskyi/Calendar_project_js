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

export const deleteEvent = eventId => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  });
};
