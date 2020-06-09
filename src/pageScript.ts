/* eslint-disable no-case-declarations */
import Cookies from 'js-cookie';
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
      installations: getInstallations(),
      version: window.mouseflow?.version,
      isRecording: window.mouseflow?.isRecording(),
      recordingRate: window.mouseflow?.recordingRate,
      websiteId: window.mouseflow?.websiteId,
      sessionId: window.mouseflow?.getSessionId(),
      cookies: getMouseflowCookies(),
      globals: getMouseflowGlobals(),
      duplicateIds: getDuplicateIds(),
    };
  };

  const getMouseflowGlobals = function(): Partial<MouseflowGlobals> {
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
  
  const getMouseflowCookies = function() {
    const mfUser = Cookies.get('mf_user');
    const mfSession = Cookies.get(`mf_${window.mouseflow?.websiteId}`);
    
    return {
      mfUser,
      mfSession,
    };
  };

  const getInstallations = function() {
    const res: string[] = [];
    const regex = /^https:\/\/cdn\.mouseflow\.com\/projects\/(.*).js$/;
    const scripts = document.querySelectorAll('script');

    scripts.forEach((script) => {
      const result = regex.exec(script.src);
      
      if (result === null) {
        return;
      }
      res.push(result[1]);
    });

    return res;
  };

  const getDuplicateIds = function() {
    const res: string[] = [];
    const elements = document.querySelectorAll('[id]');
    const ids = Array.from(elements).map((element) => element.id);
    elements.forEach((element) => {
      let count = 0;
      if (element.id !== "") {
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          if (id === element.id) {
            count += 1;
          }
        }
      }
      if (count > 1) {
        res.push(element.id);
      }
    });
    return res;
  };
})();
