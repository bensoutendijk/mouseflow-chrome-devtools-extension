declare global {
  interface Window {
    mouseflow: Mouseflow;
  }
}

export interface MFDataTickEvent extends Event {
  detail: any;
}

export interface Mouseflow {
  version: string;
  isRecording: () => boolean;
  recordingRate: number;
  websiteId: string;
  getSessionId: () => string;
  getPageviewId: () => string;
}