var port = chrome.extension.connect({
  name: "mfExtensionConnect"
});

var mfIsRecording = document.getElementById('mouseflow-is-recording');
var mfRecordingRate = document.getElementById('mouseflow-recording-rate');
var mfWebsiteId = document.getElementById('mouseflow-website-id');
var mfSessionId = document.getElementById('mouseflow-session-id');

port.onMessage.addListener(function(mf) {
  console.log(mf);
  mfIsRecording.innerText = mf.isRecording;
  mfRecordingRate.innerText = mf.recordingRate;
  mfWebsiteId.innerText = mf.websiteId;
  mfSessionId.innerText = mf.sessionId;
});