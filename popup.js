let mouseflowIsRecording = document.getElementById('mouseflow-is-recording');

chrome.storage.sync.get('mouseflow', function(data) {
  mouseflowIsRecording.innerText = data.mouseflow.isRecording;
});