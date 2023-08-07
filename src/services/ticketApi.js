import api from './api';

export async function getTicketById(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getTicketType(userId, token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function verifyIfUserHasTicket(token) {
  const response = await api.get('tickets', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export async function createTicketById(id, token) {
  const response = await api.post('tickets', { ticketTypeId: id }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getEnrollment(token) {
  const response = await api.get('enrollments', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
