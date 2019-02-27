chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const activeTab = tabs[0];
      if (sender.tab.id === activeTab.id) {
        if (request.isInstalled) {
          chrome.browserAction.setIcon({path: 'images/mf_active.png'});
        } else {
          chrome.browserAction.setIcon({path: 'images/mf_inactive.png'});
        }
      }
    });
  }
);