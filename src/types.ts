declare global {
  interface Window {
    mouseflowPath?: string;
    mouseflow?: Mouseflow;
  }
}

export type MessageData = {
  isInstalled: boolean;
  version?: string;
  isRecording?: boolean;
  recordingRate?: number;
  websiteId?: string;
  sessionId?: string;
  domain: string;
  mouseflowPath?: string;
};

export interface Mouseflow {
  version: string;
  isRecording: () => boolean;
  recordingRate: number;
  websiteId: string;
  getSessionId: () => string;
  getPageviewId: () => string;
}