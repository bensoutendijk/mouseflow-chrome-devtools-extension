chrome.runtime.onMessage.addListener(function (payload) {
  console.log(payload);
  chrome.storage.sync.set({mouseflow: payload})
});