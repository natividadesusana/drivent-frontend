import useAsync from './useAsyncActivities';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useGetActivityOfDay() {
  const token = useToken();

  const {
    data: activityofday,
    loading: activityLoading,
    error: activityError,
    act: getactivityofday
  } = useAsync((data) => activitiesApi.getActivitiesOfDay(data, token), false);

  return {
    activityofday,
    activityLoading,
    activityError,
    getactivityofday
  };
}
