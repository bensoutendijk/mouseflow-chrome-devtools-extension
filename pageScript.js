const getMouseflow = function () {
  let mfExtensionsData;
  if (window.mouseflow) {
    mfExtensionsData = {
      isInstalled: true,
      version: window.mouseflow.version,
      isRecording: window.mouseflow.isRecording(),
      recordingRate: window.mouseflow.recordingRate,
      websiteId: window.mouseflow.websiteId,
      sessionId: window.mouseflow.getSessionId(),
      documentHost: document.location.host,
    }
    clearInterval(getMouseflow);
  } else {
    mfExtensionsData = {
      isInstalled: false,
      version: null,
      isRecording: null,
      recordingRate: null,
      websiteId: null,
      sessionId: null,
    }
  }
  var mfExtensionEvent = document.createEvent("CustomEvent");
  mfExtensionEvent.initCustomEvent("mfDataTick", true, true, mfExtensionsData);
  document.dispatchEvent(mfExtensionEvent);
}

var mfWatch = setInterval(getMouseflow, 500);
