var s = document.createElement('script');
s.src = chrome.extension.getURL('pageScript.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

document.addEventListener('sendMouseflowData', function (e) {
  var data = e.detail;
  chrome.runtime.sendMessage(data)
});

