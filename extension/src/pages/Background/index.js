import store from '../../store/store';
import { wrapStore } from 'webext-redux';

wrapStore(store);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('store received', request, store.getState(), store);
});