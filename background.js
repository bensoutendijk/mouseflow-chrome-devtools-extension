chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (sender.tab.active) {
      if (request.isInstalled) {
        chrome.browserAction.setIcon({path: 'images/mf_active.png'});
      } else {
        chrome.browserAction.setIcon({path: 'images/mf_inactive.png'});
      }
    }
  }
);