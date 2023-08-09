import useAsync from './useAsyncActivities';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useGetActivityByUser() {
  const token = useToken();

  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
    act: getactivitybyuserid
  } = useAsync((activityId) => activitiesApi.getActivitieByUserId(activityId, token), false);

  return {
    activity,
    activityLoading,
    activityError,
    getactivitybyuserid
  };
}
