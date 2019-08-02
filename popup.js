var mfData = document.getElementById('mouseflow-data');
var mfVersion = document.getElementById('mouseflow-version-number');
var mfRecordingStatus = document.getElementById('recording-status');
var mfRecordingRate = document.getElementById('mouseflow-recording-rate');
var mfWebsiteId = document.getElementById('mouseflow-website-id');
var mfSessionId = document.getElementById('mouseflow-session-id');
var mfViewRecordingLink = document.getElementById('mouseflow-view-recording-link');
var sessionLink = document.getElementById('mouseflow-session-link')
var mfNotInstalled = document.getElementById('mouseflow-not-installed');
var mfOutOfCredits = document.getElementById('mouseflow-out-of-credits');
var mfOtherError = document.getElementById('mouseflow-other-error');
var mfDocumentHost = document.getElementById('document-host');

var prevMf;

chrome.runtime.onMessage.addListener(function(mf, sender) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0];
    
    if (prevMf && !Object.compare(prevMf, mf)){
      if (sender.tab.id === activeTab.id) {
        if (prevMf && Object.compare(prevMf, mf)) {
          console.log('Should not update');
        } else {
          console.log('Should update');
          console.log(prevMf);
          console.log(mf);
        }
        if(mf.isInstalled && mf.recordingRate === null) {
          mfOutOfCredits.style = "display: block";
        } else if (!mf.isRecording && mf.recordingRate === 100) {
          mfDocumentHost.innerText = mf.documentHost;
          mfOtherError.style = "display: block";
        } else if (mf.isInstalled) {
          mfVersion.innerText = mf.version;
          mfRecordingStatus.innerHTML = mf.isRecording ? '<img class="red-dot" src="images/red_dot.png">' : 'Off';
          mfRecordingRate.innerText = mf.recordingRate;
          mfWebsiteId.innerText = mf.websiteId;
          mfSessionId.innerText = mf.sessionId;
          sessionLink.href = `https://app.mouseflow.com/websites/${mf.websiteId}/recordings/${mf.sessionId}/play`;
          mfData.style = 'display: block';
        } else {
          mfNotInstalled.style = "display: block";
        }
      }
    }
    prevMf = mf;
  });
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


Object.compare = function (obj1, obj2) {
	//Loop through properties in object 1
	for (var p in obj1) {
		//Check property exists on both objects
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
 
		switch (typeof (obj1[p])) {
			//Deep compare objects
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
			//Compare function code
			case 'function':
				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
				break;
			//Compare values
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}
 
	//Check object 2 for any extra properties
	for (var p in obj2) {
		if (typeof (obj1[p]) == 'undefined') return false;
	}
	return true;
};