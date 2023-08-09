import useAsync from './useAsyncActivities';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function usePostActivity() {
  const token = useToken();

  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
    act: postactivity
  } = useAsync((body) => activitiesApi.postActivitie(body, token), false);

  return {
    activity,
    activityLoading,
    activityError,
    postactivity
  };
}
