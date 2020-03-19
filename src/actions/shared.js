import { getInitialData } from '../utils/api';
import { receiveTweets } from '../actions/tweets';
import { receiveUsers } from './users';
import { setAuthedUser } from './authedUser';

const AUTHED_ID = 'tylermcginnis';

export const handleInitialData = () => {
  return dispatch => {
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveTweets(tweets));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
};
