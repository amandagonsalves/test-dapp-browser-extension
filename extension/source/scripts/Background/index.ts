/* eslint-disable prettier/prettier */
import 'emoji-log';
import { STORE_PORT } from 'constants/index';

import { browser } from 'webextension-polyfill-ts';
import { wrapStore } from 'webext-redux';
import store from 'state/store';

import MasterController, { IMasterController } from './controllers';

declare global {
  interface Window {
    controller: Readonly<IMasterController>;
  }
}

if (!window.controller) {
  window.controller = Object.freeze(MasterController());
  setInterval(window.controller.stateUpdater, 3 * 60 * 1000);
}

browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🤩', 'Syscoin extension installed');

  window.controller.stateUpdater();

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (typeof request == 'object' && request.type == 'OPEN_WALLET_POPUP') {
      const URL = chrome.runtime.getURL('app.html');

      if (request.shouldInjectProvider) {
        chrome.windows.create({ url: URL, type: 'popup', width: 372, height: 600, left: 900, top: 90 });

        sendResponse({ sender, request, controller: store.getState() });
      }
    }
  });
});

wrapStore(store, { portName: STORE_PORT });
