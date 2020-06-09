import { MouseflowEventDetail, MouseflowEventType } from "./types";

chrome.runtime.onMessage.addListener(
  function(message: MouseflowEventDetail, sender, sendResponse) {
    switch (message.type) {
      case MouseflowEventType.RECEIVE_DIAGNOSTICS:
        if (message.payload.installations.length > 0) {
          chrome.browserAction.setIcon({path: 'assets/images/mf_active.png'});
        } else {
          chrome.browserAction.setIcon({path: 'assets/images/mf_inactive.png'});
        }
        break;        
      default:
        break;
    }
  },
);

setInterval(function() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab && activeTab.id) {
      chrome.tabs.sendMessage(activeTab.id, { type: MouseflowEventType.FETCH_DIAGNOSTICS });
    }
  });
}, 500);