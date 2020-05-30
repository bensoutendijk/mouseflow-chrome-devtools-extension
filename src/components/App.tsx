import React, { useEffect, useState } from 'react';
import Header from './Header';
import DiagnosticsCard from './DiagnosticsCard';

import { MouseflowEventDetail, MouseflowDiagnostics, MouseflowEventType } from '../types';

interface AppState {
  diagnostics?: MouseflowDiagnostics;
}

const App = function() {
  const [state, setState] = useState<AppState>({});

  const handleClick: React.MouseEventHandler = function(event) {
    event.preventDefault();
    const message: MouseflowEventDetail = {
      type: MouseflowEventType.STOP_SESSION,
    };
    chrome.runtime.sendMessage(message);
  };

  useEffect(() => {
    chrome.runtime.sendMessage({ type: MouseflowEventType.FETCH_DIAGNOSTICS });
  }, []);

  useEffect(() => {
    const eventHandler = function(response: MouseflowEventDetail) {
      switch (response.type) {
        case MouseflowEventType.RECEIVE_DIAGNOSTICS:
          setState({
            ...state,
            diagnostics: response.payload,
          });
          break;
      
        default:
          break;
      }
    };

    chrome.runtime.onMessage.addListener(eventHandler);

    return () => chrome.runtime.onMessage.removeListener(eventHandler);
  });

  if (typeof state.diagnostics === 'undefined') {
    return null;
  }

  return (
    <div className="App">
      <div className="container mt-4">
        <Header version={state.diagnostics.version} isInstalled={state.diagnostics.isInstalled} />
        {state.diagnostics.isInstalled ? (
          <div>
            <DiagnosticsCard 
              isRecording={state.diagnostics.isRecording}
              recordingRate={state.diagnostics.recordingRate}
              websiteId={state.diagnostics.websiteId}
              sessionId={state.diagnostics.sessionId}
            />
            <div className="UtilitiesMenu mt-2">
              <button type="button" className="btn btn-warn" onClick={handleClick}>Stop Session</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
