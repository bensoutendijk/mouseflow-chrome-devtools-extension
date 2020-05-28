import { MessageData } from "./types";

const mfPageScript = document.createElement('script');
mfPageScript.src = chrome.extension.getURL('pageScript.js');
document.head.appendChild(mfPageScript);

document.addEventListener('mfDataTick', function (event: CustomEvent<MessageData>) {
  const data = event.detail;
  chrome.runtime.sendMessage(data);
} as EventListener);

