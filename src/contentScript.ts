import { MFDataTickEvent } from "./types";

const mfPageScript = document.createElement('script');
mfPageScript.src = chrome.extension.getURL('pageScript.js');
document.head.appendChild(mfPageScript);

document.addEventListener('mfDataTick', function (e: MFDataTickEvent) {
  const data = e.detail;
  chrome.runtime.sendMessage(data);
} as EventListener);

