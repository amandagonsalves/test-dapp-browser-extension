import { browser } from 'webextension-polyfill-ts';

declare global {
  interface Window {
    SyscoinWallet: any;
  }
}

const doctypeCheck = () => {
  const { doctype } = window.document;

  if (doctype) {
    return doctype.name === 'html';
  }

  return true;
}

const suffixCheck = () => {
  const prohibitedTypes = [/\.xml$/u, /\.pdf$/u];
  const currentUrl = window.location.pathname;

  for (let i = 0; i < prohibitedTypes.length; i++) {
    if (prohibitedTypes[i].test(currentUrl)) {
      return false;
    }
  }

  return true;
}

const documentElementCheck = () => {
  const documentElement = document.documentElement.nodeName;

  if (documentElement) {
    return documentElement.toLowerCase() === 'html';
  }

  return true;
}

const blockedDomainCheck = () => {
  const blockedDomains = [
    'dropbox.com',
    'github.com',
  ];

  const currentUrl = window.location.href;
  let currentRegex;

  for (let i = 0; i < blockedDomains.length; i++) {
    const blockedDomain = blockedDomains[i].replace('.', '\\.');

    currentRegex = new RegExp(
      `(?:https?:\\/\\/)(?:(?!${blockedDomain}).)*$`,
      'u',
    );

    if (!currentRegex.test(currentUrl)) {
      return true;
    }
  }

  return false;
}

export const shouldInjectProvider = () => {
  return (
    doctypeCheck() &&
    suffixCheck() &&
    documentElementCheck() &&
    !blockedDomainCheck()
  );
}

function injectScript(content: any) {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement('script');
    scriptTag.textContent = content;

    container.insertBefore(scriptTag, container.children[0]);

    scriptTag.onload = () => {
      scriptTag.remove();
    }
  } catch (error) {
    console.error('Syscoin Wallet: Provider injection failed.', error);
  }
}

function injectScriptFile(file: string) {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement('script');
    scriptTag.src = browser.runtime.getURL(file);
    
    container.insertBefore(scriptTag, container.children[0]);

    scriptTag.onload = () => {
      scriptTag.remove();
    }
  } catch (error) {
    console.error('Syscoin Wallet: Provider injection failed.', error);
  }
}

if (shouldInjectProvider()) {
  injectScript("window.SyscoinWallet = 'Syscoin Wallet is installed! :)'");

  window.dispatchEvent(new CustomEvent('SyscoinStatus', { detail: { SyscoinInstalled: true, ConnectionsController: false } }));

  injectScriptFile('js/inpage.bundle.js');
}

window.addEventListener("message", (event) => {
  if (event.source != window) {
    return;
  }

  if (event.data.type == "FROM_PAGE") {
    browser.runtime.sendMessage({
      type: 'OPEN_WALLET_POPUP',
      target: 'background'
    });

    return;
  }

  if (event.data.type == 'SEND_STATE_TO_PAGE' && event.data.target == 'contentScript') {
    browser.runtime.sendMessage({
      type: 'SEND_STATE_TO_PAGE',
      target: 'background'
    });

    return;
  }

  if (event.data.type == 'SEND_CONNECTED_ACCOUNT' && event.data.target == 'contentScript') {
    browser.runtime.sendMessage({
      type: 'SEND_CONNECTED_ACCOUNT',
      target: 'background'
    });

    return;
  }

  if (event.data.type == 'TRANSFER_SYS' && event.data.target == 'contentScript') {
    browser.runtime.sendMessage({
      type: 'TRANSFER_SYS',
      target: 'background',
      fromActiveAccountId: event.data.fromActiveAccountId,
      toAddress: event.data.toAddress,
      amount: event.data.amount,
      fee: event.data.fee
    });

    return;
  }
}, false);

browser.runtime.onMessage.addListener(request => {
  if (typeof request == 'object' && request.type == 'DISCONNECT') {
    const id = browser.runtime.id;
    const port = browser.runtime.connect(id, { name: 'SYSCOIN' });

    port.disconnect();

    return;
  }

  if (request.type == 'SEND_STATE_TO_PAGE' && request.target == 'contentScript') {
    window.postMessage({
      type: 'SEND_STATE_TO_PAGE',
      target: 'connectionsController',
      state: request.state
    }, '*');

    return;
  }

  if (request.type == 'SEND_CONNECTED_ACCOUNT' && request.target == 'contentScript') {
    window.postMessage({
      type: 'SEND_CONNECTED_ACCOUNT',
      target: 'connectionsController',
      connectedAccount: request.connectedAccount
    }, '*');

    return;
  }

  if (request.type == 'TRANSFER_SYS' && request.target == 'contentScript') {
    window.postMessage({
      type: 'TRANSFER_SYS',
      target: 'connectionsController',
      complete: request.complete
    }, '*');

    return;
  }
});