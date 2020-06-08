import React from 'react';
import clsx from 'clsx';
import { MouseflowEventDetail, MouseflowEventType } from '../types';

interface SessionControlsProps {
  isRecording: boolean;
}

const SessionControls: React.FC<SessionControlsProps> = function({ isRecording }) {

  const handleStopSession: React.MouseEventHandler = function(event) {
    event.preventDefault();
    const message: MouseflowEventDetail = {
      type: MouseflowEventType.STOP_SESSION,
    };
    chrome.tabs.query({ currentWindow: true, active: true}, function(tabs) {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, message);
      }
    });
  };

  const handleStartSession: React.MouseEventHandler = function(event) {
    event.preventDefault();
    const message: MouseflowEventDetail = {
      type: MouseflowEventType.START_SESSION,
    };
    chrome.tabs.query({ currentWindow: true, active: true}, function(tabs) {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, message);
      }
    });
  };

  return (
    <div>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className={clsx("btn btn-secondary", { active: isRecording })}>
          <input type="radio" name="options" id="start-session" checked={isRecording} onClick={handleStartSession} />
          <img style={{ height: '1em' }} src={isRecording ? "assets/images/circle-solid-red.svg" : "assets/images/circle-solid.svg"} />
        </label>
        <label className={clsx("btn btn-secondary", { active: !isRecording })}>
          <input type="radio" name="options" id="stop-session" checked={!isRecording} onClick={handleStopSession} />
          <img style={{ height: '1em' }} src="assets/images/square-solid.svg" />
        </label>
      </div>
      <div className={clsx("badge ml-2", isRecording ? 'badge-danger' : 'badge-secondary')}>
        {isRecording ? 'Recording' : 'Stopped' }
      </div>
    </div>
  );
};

export default SessionControls;
