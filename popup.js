var mfData = document.getElementById('mouseflow-data');
var mfIsRecording = document.getElementById('mouseflow-is-recording');
var mfRecordingRate = document.getElementById('mouseflow-recording-rate');
var mfWebsiteId = document.getElementById('mouseflow-website-id');
var mfSessionId = document.getElementById('mouseflow-session-id');
var mfViewRecordingLink = document.getElementById('mouseflow-view-recording-link');
var sessionLink = document.getElementById('mouseflow-session-link')
var mfNotInstalled = document.getElementById('mouseflow-not-installed');

chrome.runtime.onMessage.addListener(function(mf, sender) {
  if (sender.tab.active) {
    if(mf.isInstalled) {
      mfIsRecording.innerText = mf.isRecording ? 'On' : 'FALSE';
      mfRecordingRate.innerText = mf.recordingRate;
      mfWebsiteId.innerText = mf.websiteId;
      mfSessionId.innerText = mf.sessionId;
      sessionLink.href = `https://app.mouseflow.com/websites/${mf.websiteId}/recordings/${mf.sessionId}/play`;
      mfData.style = 'display: block';
    } else {
      mfNotInstalled.style = "display: block";
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button-copy-website-id').addEventListener('click', () => {
    var copyText = document.getElementById("mouseflow-website-id");
    /* Select the text field */
    copyText.select();
    /* Copy the text inside the text field */
    document.execCommand("copy");
    document.getElementById('copy-success-text').classList.add('copied');
  });
});
