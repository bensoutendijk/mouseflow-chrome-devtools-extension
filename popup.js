var mfIsRecording = document.getElementById('mouseflow-is-recording');
var mfRecordingRate = document.getElementById('mouseflow-recording-rate');
var mfWebsiteId = document.getElementById('mouseflow-website-id');
var mfSessionId = document.getElementById('mouseflow-session-id');

chrome.runtime.onMessage.addListener(function(mf, sender) {
  if (sender.tab.active) {
    mfIsRecording.innerText = mf.isRecording;
    mfRecordingRate.innerText = mf.recordingRate;
    mfWebsiteId.innerText = mf.websiteId;
    mfSessionId.innerText = mf.sessionId;
  }
});