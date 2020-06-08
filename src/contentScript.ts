/* eslint-disable no-case-declarations */
import { MouseflowEvent, MouseflowEventDetail, MouseflowEventType } from "./types";

// Attach and run page script to access Window properties
const mfPageScript = document.createElement('script');
mfPageScript.src = chrome.extension.getURL('pageScript.js');
document.head.appendChild(mfPageScript);

// Proxy events from Page Script to Background
document.addEventListener('mouseflow', function (event: MouseflowEvent) {
  chrome.runtime.sendMessage(event.detail);
} as EventListener);

// Proxy events from Background to Page Script
chrome.runtime.onMessage.addListener((message: MouseflowEventDetail, sender) => {
  const event = new CustomEvent<MouseflowEventDetail>('mouseflow', {
    detail: message,
  });
  document.dispatchEvent(event);
});