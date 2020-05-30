import { MouseflowEventDetail, MouseflowEventType } from "./types";

chrome.runtime.onMessage.addListener(
  function(message: MouseflowEventDetail, sender, sendResponse) {
    switch (message.type) {
      case MouseflowEventType.RECEIVE_DIAGNOSTICS:
        if (message.payload.isInstalled) {
          chrome.browserAction.setIcon({path: 'assets/images/mf_active.png'});
        } else {
          chrome.browserAction.setIcon({path: 'assets/images/mf_inactive.png'});
        }
        break;        
      default:
        break;
    }
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.tabs.sendMessage(activeTab.id, message);
      }
    });
  },
);