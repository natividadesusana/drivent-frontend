import useAsync from './useAsyncActivities';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivityUnsubscribe() {
  const token = useToken();

  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
    act: activityunsubscribe,
  } = useAsync((activityId) => activitiesApi.unsubscribe(activityId, token), false);

  return {
    activity,
    activityLoading,
    activityError,
    activityunsubscribe,
  };
}
