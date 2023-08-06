import api from './api';

export async function postActivitie(body, token) {
  const response = await api.post('/activities/subscription', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActivitieByUserId(activityId, token) {
  const response = await api.get(`/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getDays(token) {
  const response = await api.get('/activities/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivitiesOfDay(date, token) {
  const response = await api.get(`/activities/days/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function unsubscribe(activityId, token) {
  const response = await api.delete(`/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
