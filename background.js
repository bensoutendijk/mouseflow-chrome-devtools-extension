chrome.extension.onConnect.addListener(function(port) {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (sender.tab.active) {
        console.log(request);
        port.postMessage(request);
      }
    }
  );
})

