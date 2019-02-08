var mfWatch = setInterval(function () {
  let mfExtensionsData;
  if (window.mouseflow) {
    mfExtensionsData = {
      isInstalled: true,
      isRecording: window.mouseflow.isRecording(),
      recordingRate: window.mouseflow.recordingRate,
      websiteId: window.mouseflow.websiteId,
      sessionId: window.mouseflow.getSessionId(),
    }
  } else {
    mfExtensionsData = {
      isInstalled: false,
      isRecording: null,
      recordingRate: null,
      websiteId: null,
      sessionId: null,
    }
  }
  var mfExtensionEvent = document.createEvent("CustomEvent");
  mfExtensionEvent.initCustomEvent("mfDataTick", true, true, mfExtensionsData);
  document.dispatchEvent(mfExtensionEvent);
}, 500)
