import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

console.log(document.getElementById('app'));

ReactDOM.render(<App />, document.getElementById('app'));

// const mfData = document.getElementById('mouseflow-data');
// const mfVersion = document.getElementById('mouseflow-version-number');
// const mfRecordingStatus = document.getElementById('recording-status');
// const mfRecordingRate = document.getElementById('mouseflow-recording-rate');
// const mfWebsiteId = document.getElementById('mouseflow-website-id');
// const mfSessionId = document.getElementById('mouseflow-session-id');
// const mfViewRecordingLink = document.getElementById('mouseflow-view-recording-link');
// const sessionLink = document.getElementById('mouseflow-session-link') as HTMLAnchorElement;
// const mfNotInstalled = document.getElementById('mouseflow-not-installed');
// const mfOutOfCredits = document.getElementById('mouseflow-out-of-credits');
// const mfOtherError = document.getElementById('mouseflow-other-error');
// const mfDocumentHost = document.getElementById('document-host');
// const mfMouseflowPath = document.getElementById('mouseflowPath');

// chrome.runtime.onMessage.addListener(function(message: MessageData, sender) {
//   chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//     const activeTab = tabs[0];

//     if (sender.tab?.id === activeTab.id) {
//       if(message.isInstalled === true && message.recordingRate === null) {
//         if (mfOutOfCredits !== null) 
//           mfOutOfCredits.style.display = "block";
//       } else if(message.isInstalled === false) {
//         if (mfNotInstalled !== null)
//           mfNotInstalled.style.display = "block";
//       } else if (message.isInstalled == true) {
//         if (mfVersion !== null && typeof message.version !== 'undefined')
//           mfVersion.innerText = message.version;
//         if (mfRecordingStatus !== null)
//           mfRecordingStatus.innerHTML = message.isRecording ? '<img class="red-dot" src="assets/images/red_dot.png">' : 'Off';
//         if (mfRecordingRate !== null && typeof message.recordingRate !== 'undefined')
//           mfRecordingRate.innerText = message.recordingRate.toString();
//         if (mfWebsiteId !== null && typeof message.websiteId !== 'undefined')
//           mfWebsiteId.innerText = message.websiteId;
//         if (mfSessionId !== null && typeof message.sessionId !== 'undefined')
//           mfSessionId.innerText = message.sessionId;
//         if (sessionLink !== null)
//           sessionLink.href = `https://app.mouseflow.com/websites/${message.websiteId}/recordings/${message.sessionId}/play`;
//         if (mfMouseflowPath !== null && typeof message.mouseflowPath !== 'undefined')
//           mfMouseflowPath.style.display = 'inline-block',
//           mfMouseflowPath.innerText = message.mouseflowPath;
//         if (mfData !== null)
//           mfData.style.display = 'block';
//       }
//     }
//   });
// });

// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById('button-copy-website-id')?.addEventListener('click', () => {
//     const copyText = document.getElementById("mouseflow-website-id") as HTMLInputElement;
//     /* Select the text field */
//     copyText?.select();
//     /* Copy the text inside the text field */
//     document.execCommand("copy");
//     document.getElementById('copy-success-text')?.classList.add('copied');
//   });
// });