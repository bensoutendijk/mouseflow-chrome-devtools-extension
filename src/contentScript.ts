/* eslint-disable no-case-declarations */
import { MouseflowEvent, MouseflowEventDetail, MouseflowEventType } from "./types";

const mfPageScript = document.createElement('script');
mfPageScript.src = chrome.extension.getURL('pageScript.js');
document.head.appendChild(mfPageScript);

document.addEventListener('mouseflow', function (event: MouseflowEvent) {
  switch (event.detail.type) {
    case MouseflowEventType.RECEIVE_DIAGNOSTICS:
      chrome.runtime.sendMessage(event.detail);
      break;
    default:
      break;
  }
} as EventListener);

chrome.runtime.onMessage.addListener((message: MouseflowEventDetail, sender) => {
  const event = new CustomEvent<MouseflowEventDetail>('mouseflow', {
    detail: message,
  });
  switch (message.type) {
    case MouseflowEventType.FETCH_DIAGNOSTICS:
      document.dispatchEvent(event);
      break;
    case MouseflowEventType.STOP_SESSION:
      document.dispatchEvent(event);
      break;
    default:
      break;
  }
});

chrome.runtime.sendMessage({ type: MouseflowEventType.FETCH_DIAGNOSTICS });
const interval = setInterval(() => chrome.runtime.sendMessage({
  type: MouseflowEventType.FETCH_DIAGNOSTICS,
}), 500);