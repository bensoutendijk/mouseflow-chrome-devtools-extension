declare global {
  interface Window {
    mouseflowPath?: string;
    mouseflow?: Mouseflow;
  }
}

export enum MouseflowEventType {
  FETCH_DIAGNOSTICS,
  RECEIVE_DIAGNOSTICS,
  START_SESSION,
  STOP_SESSION
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
  domain: string;
  mouseflowPath?: string;
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