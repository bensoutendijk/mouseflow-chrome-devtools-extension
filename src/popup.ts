const mfData = document.getElementById('mouseflow-data');
const mfVersion = document.getElementById('mouseflow-version-number');
const mfRecordingStatus = document.getElementById('recording-status');
const mfRecordingRate = document.getElementById('mouseflow-recording-rate');
const mfWebsiteId = document.getElementById('mouseflow-website-id');
const mfSessionId = document.getElementById('mouseflow-session-id');
const mfViewRecordingLink = document.getElementById('mouseflow-view-recording-link');
const sessionLink = document.getElementById('mouseflow-session-link') as HTMLAnchorElement;
const mfNotInstalled = document.getElementById('mouseflow-not-installed');
const mfOutOfCredits = document.getElementById('mouseflow-out-of-credits');
const mfOtherError = document.getElementById('mouseflow-other-error');
const mfDocumentHost = document.getElementById('document-host');

chrome.runtime.onMessage.addListener(function(mf, sender) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0];
    console.log(sender.tab?.id === activeTab.id);
    if (sender.tab?.id === activeTab.id) {
      if(mf.isInstalled && mf.recordingRate === null) {
        if (mfOutOfCredits !== null) 
          mfOutOfCredits.style.display = "block";
      } else if (!mf.isRecording && mf.recordingRate === 100) {
        if (mfDocumentHost !== null)
          mfDocumentHost.innerText = mf.documentHost;
        if (mfOtherError !== null)
          mfOtherError.style.display = "block";
      } else if (mf.isInstalled) {
        if (mfVersion !== null)
          mfVersion.innerText = mf.version;
        if (mfRecordingStatus !== null)
          mfRecordingStatus.innerHTML = mf.isRecording ? '<img class="red-dot" src="assets/images/red_dot.png">' : 'Off';
        if (mfRecordingRate !== null)
          mfRecordingRate.innerText = mf.recordingRate;
        if (mfWebsiteId !== null)
          mfWebsiteId.innerText = mf.websiteId;
        if (mfSessionId !== null)
          mfSessionId.innerText = mf.sessionId;
        if (sessionLink !== null)
          sessionLink.href = `https://app.mouseflow.com/websites/${mf.websiteId}/recordings/${mf.sessionId}/play`;
        if (mfData !== null)
          mfData.style.display = 'block';
      } else {
        if (mfNotInstalled !== null)
          mfNotInstalled.style.display = "block";
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button-copy-website-id')?.addEventListener('click', () => {
    const copyText = document.getElementById("mouseflow-website-id") as HTMLInputElement;
    /* Select the text field */
    copyText?.select();
    /* Copy the text inside the text field */
    document.execCommand("copy");
    document.getElementById('copy-success-text')?.classList.add('copied');
  });
});