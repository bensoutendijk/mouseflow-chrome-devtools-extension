var mfPageScript = document.createElement('script');
mfPageScript.src = chrome.extension.getURL('pageScript.js');
mfPageScript.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(mfPageScript);

document.addEventListener('mfDataTick', function (e) {
  var data = e.detail;
  chrome.runtime.sendMessage(data);
});

