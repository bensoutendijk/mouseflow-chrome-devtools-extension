var checkMouseflowLoaded = setInterval(function () {
  if (window.mouseflow) {
    var mfExtensionsData = {
      isRecording: window.mouseflow.isRecording(),
      recordingRate: window.mouseflow.recordingRate,
      websiteId: window.mouseflow.websiteId,
      sessionId: window.mouseflow.getSessionId(),
    }

    var mfExtensionEvent = document.createEvent("CustomEvent");
    mfExtensionEvent.initCustomEvent("sendMouseflowData", true, true, mfExtensionsData);
    document.dispatchEvent(mfExtensionEvent);
    
    clearInterval(checkMouseflowLoaded);
  }
},500)
