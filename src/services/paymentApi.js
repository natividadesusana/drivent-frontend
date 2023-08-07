import api from './api';

export async function payment(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getTicketPayment(ticketId, token) {
  const response = await api.get('/payments/', {
    params: {
      ticketId
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
