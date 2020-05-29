chrome.runtime.onMessage.addListener(
  function(request, sender) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const activeTab = tabs[0];
      if (sender.tab?.id === activeTab.id) {
        if (request.isInstalled) {
          chrome.browserAction.setIcon({path: 'assets/images/mf_active.png'});
        } else {
          chrome.browserAction.setIcon({path: 'assets/images/mf_inactive.png'});
        }
      }
    });
  },
);