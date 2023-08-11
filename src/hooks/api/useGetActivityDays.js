import useAsync from './useAsyncActivities';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useGetActivityDays() {
  const token = useToken();

  const {
    data: activitydays,
    loading: activitydaysLoading,
    error: activitydaysError,
    act: getactivitydays
  } = useAsync(() => activitiesApi.getDays(token), false);

  return {
    activitydays,
    activitydaysLoading,
    activitydaysError,
    getactivitydays
  };
}
