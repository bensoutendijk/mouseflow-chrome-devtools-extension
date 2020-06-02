/* eslint-disable no-case-declarations */
import { MouseflowEventDetail, MouseflowEvent, MouseflowEventType, MouseflowDiagnostics, MouseflowGlobals } from "./types";

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
      case MouseflowEventType.FETCH_WINDOW_GLOBALS:
        Object.assign(responseEvent.detail, {
          type: MouseflowEventType.RECEIVE_WINDOW_GLOBALS,
          payload: getMouseflowVariables(),
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
      case MouseflowEventType.START_SESSION:
        window.mouseflow?.start();
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
    };
  };

  const getMouseflowVariables = function(): Partial<MouseflowGlobals> {
    return {
      mouseflowPath: window.mouseflowPath,
      mouseflowAutoStart: window.mouseflowAutoStart,
      mouseflowDisableKeyLogging: window.mouseflowDisableKeyLogging,
      mouseflowExcludeSubDomains: window.mouseflowExcludeSubDomains,
      mouseflowCrossDomainSupport: window.mouseflowCrossDomainSupport,
      mouseflowHref: window.mouseflowHref,
      mouseflowRegisterSubmitTimeout: window.mouseflowRegisterSubmitTimeout,
      mouseflowDisableDomDeduplicator: window.mouseflowDisableDomDeduplicator,
      mouseflowAutoTagging: window.mouseflowAutoTagging,
      mouseflowDisableDomReuse: window.mouseflowDisableDomReuse,
      mouseflowHtmlDelay: window.mouseflowHtmlDelay,
      mouseflowForceGdpr: window.mouseflowForceGdpr,
      mouseflowSessionId: window.mouseflowSessionId,
      mouseflowCompress: window.mouseflowCompress,
      mouseflowDebug: window.mouseflowDebug,
      mouseflowUseCssPaths: window.mouseflowUseCssPaths,
      mouseflowDisableCssPaths: window.mouseflowDisableCssPaths,
      mouseflowHtmlFetchMode: window.mouseflowHtmlFetchMode,
    };
  };
})();
