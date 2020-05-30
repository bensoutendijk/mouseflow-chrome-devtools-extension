/* eslint-disable no-case-declarations */
import { MouseflowEventDetail, MouseflowEvent, MouseflowEventType, MouseflowDiagnostics } from "./types";

(function() {
  document.addEventListener('mouseflow', function (requestEvent: MouseflowEvent) {
    const responseEvent = new CustomEvent<MouseflowEventDetail | unknown >('mouseflow', { detail: {} });
    switch (requestEvent.detail.type) {
      case MouseflowEventType.FETCH_DIAGNOSTICS:
        Object.assign(responseEvent.detail, {
          type: MouseflowEventType.RECEIVE_DIAGNOSTICS,
          payload: getDiagnostics(),
        }),

        document.dispatchEvent(responseEvent);
        break;
      case MouseflowEventType.STOP_SESSION:
        window.mouseflow?.stopSession();
        Object.assign(responseEvent.detail, {
          type: MouseflowEventType.RECEIVE_DIAGNOSTICS,
          payload: getDiagnostics(),
        }),
        document.dispatchEvent(responseEvent);
        break;
      default:
        break;
    }
  } as EventListener);

  const getDiagnostics = function(): MouseflowDiagnostics {
    return {
      isInstalled: !!window.mouseflow,
      version: window.mouseflow?.version,
      isRecording: window.mouseflow?.isRecording(),
      recordingRate: window.mouseflow?.recordingRate,
      websiteId: window.mouseflow?.websiteId,
      sessionId: window.mouseflow?.getSessionId(),
      domain: window.location.host,
      mouseflowPath: window.mouseflowPath,
    };
  };
})();
