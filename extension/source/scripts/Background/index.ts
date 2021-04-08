/* eslint-disable prettier/prettier */
import 'emoji-log';
import {STORE_PORT} from 'constants/index';

import {browser} from 'webextension-polyfill-ts';
import {wrapStore} from 'webext-redux';
import store from 'state/store';
import {setConnectionInfo, setFirstConnectionStatus, updateConnection} from 'state/wallet';

import MasterController, {IMasterController} from './controllers';

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

  browser.runtime.onMessage.addListener((request, sender) => {
    if (typeof request == 'object' && request.type == 'OPEN_WALLET_POPUP') {
      const URL = browser.runtime.getURL('app.html');

      if (request.shouldInjectProvider) {
        store.dispatch(setConnectionInfo(sender.url));
        store.dispatch(setFirstConnectionStatus(!store.getState().wallet.isConnected));

        browser.windows.create({url: URL, type: 'popup', width: 372, height: 600, left: 900, top: 90});
      }
    }

    if (typeof request == 'object' && request.type == 'RESET_CONNECTION_INFO') {
      store.dispatch(setConnectionInfo(''));
      store.dispatch(updateConnection(false));
      store.dispatch(setFirstConnectionStatus(true));

      return;
    }

    if (typeof request == 'object' && request.type == 'CONFIRM_CONNECTION') {
      store.dispatch(updateConnection(true));

      browser.tabs.query({ active: true }).then(async (tabs) => {
        // @ts-ignore
        await browser.tabs.sendMessage(tabs[0].id, { type: 'DISCONNECT', controller: store.getState() });
      }).then(response => {
        console.log('browser tabs finalized', response)
      });

      return;
    }

    if (store.getState().wallet.isConnected) {
      // browser.tabs.query({ active: true }).then(async (tabs) => {
      //   // @ts-ignore
      //   await browser.tabs.sendMessage(tabs[0].id, { type: 'DISCONNECT', controller: store.getState() });
      // }).then(response => {
      //   console.log('browser tabs finalized', response)
      // });
      // return {
      //   controller: store.getState();
      // }
      console.log('is connected true')
    }
  });

  browser.runtime.onConnect.addListener((port) => {
    port.onDisconnect.addListener(async () => {
      const all = await browser.windows.getAll();
      const windowId = all[1].id;
      // @ts-ignore
      await browser.windows.remove(windowId);
    })
  })
});

wrapStore(store, {portName: STORE_PORT});