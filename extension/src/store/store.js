import { configureStore } from '@reduxjs/toolkit';
import throttle from 'lodash/throttle';
import authReducer, { updateState } from './auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const handleSaveState = () => {
  const state = store.getState();

  console.log('saving state', state);

  try {
    chrome.storage.local.set({
      state,
    });
  } catch (error) {
    console.error('<!> Error saving state', error);
  }
};

const handleLoadState = () => {
  chrome.storage.local.get(['state'], ({ state }) => {
    const { auth = {} } = state || {};

    store.dispatch(
      updateState(auth),
    );
  });
};

handleLoadState();

store
  .subscribe(
    throttle(handleSaveState, 1000, { trailing: true, leading: true }),
  );

window.store = store;

export default store;
