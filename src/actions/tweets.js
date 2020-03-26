import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

const addTweet = tweet => {
  return {
    type: ADD_TWEET,
    tweet,
  };
};

export const handleAddTweet = (text, replyingTo) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveTweet({
      text,
      author: authedUser,
      replyingTo,
    })
      .then(tweet => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()));
  };
};

export const receiveTweets = tweets => ({
  type: RECEIVE_TWEETS,
  tweets,
});

const toggleTweet = ({ id, authedUser, hasLiked }) => {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked,
  };
};

export const handleToggleTweet = info => {
  return dispatch => {
    dispatch(toggleTweet(info));

    return saveLikeToggle(info).catch(e => {
      console.warn('Error in handleToggleTweet: ', e);
      dispatch(toggleTweet(info));
      alert('There was and error liking the tweet. Please try again.');
    });
  };
};
