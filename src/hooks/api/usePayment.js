import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();

  const {
    loading: getPaymentLoading,
    error: getPaymentError,
    act: getPayment
  } = useAsync((tiketId) => paymentApi.getTicketPayment(tiketId, token), false);

  return {
    getPaymentLoading,
    getPaymentError,
    getPayment
  };
}
