declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends Partial<MouseflowGlobals> {
    [key: string]: any;
  }
}

export interface MouseflowGlobals {
  [key: string]: any;
  mouseflow?: Mouseflow;
  mouseflowPath?: string;
  mouseflowAutoStart: boolean;
  mouseflowDisableKeyLogging: boolean;
  mouseflowExcludeSubDomains: boolean;
  mouseflowCrossDomainSupport: boolean;
  mouseflowHref: string;
  mouseflowRegisterSubmitTimeout: number;
  mouseflowDisableDomDeduplicator: boolean;
  mouseflowAutoTagging: boolean;
  mouseflowDisableDomReuse: boolean;
  mouseflowHtmlDelay: number;
  mouseflowForceGdpr: boolean;
  mouseflowSessionId: string;
  mouseflowCompress: boolean;
  mouseflowDebug: boolean;
  mouseflowUseCssPaths: boolean;
  mouseflowDisableCssPaths: boolean;
  mouseflowHtmlFetchMode: "post" | "crawl-with-cookies" | "none";
}

export enum MouseflowEventType {
  FETCH_DIAGNOSTICS = "FETCH_DIAGNOSTICS",
  RECEIVE_DIAGNOSTICS = "RECEIVE_DIAGNOSTICS",
  START_SESSION = "START_SESSION",
  STOP_SESSION = "STOP_SESSION"
}

export type MouseflowEvent = CustomEvent<MouseflowEventDetail>;

export type MouseflowEventDetail = {
  type: MouseflowEventType.FETCH_DIAGNOSTICS;
} | {
  type: MouseflowEventType.RECEIVE_DIAGNOSTICS;
  payload: MouseflowDiagnostics;
} | {
  type: MouseflowEventType.STOP_SESSION;
} | {
  type: MouseflowEventType.START_SESSION;
};

export interface MouseflowDiagnostics {
  isInstalled: boolean;
  version?: string;
  isRecording?: boolean;
  recordingRate?: number;
  websiteId?: string;
  sessionId?: string;
  cookies: {
    [key: string]: string | undefined;
  };
  globals: Partial<MouseflowGlobals>;
}


export interface Mouseflow {
  version: string;
  isRecording: () => boolean;
  recordingRate: number;
  websiteId: string;
  getSessionId: () => string;
  getPageviewId: () => string;
  stopSession: () => void;
  start: () => void;
}