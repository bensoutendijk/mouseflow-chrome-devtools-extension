import React, { useEffect, useState } from 'react';
import Header from './Header';
import DiagnosticsCard from './DiagnosticsCard';

import { MouseflowEventDetail,
  MouseflowDiagnostics, 
  MouseflowEventType, 
  MouseflowGlobals, 
} from '../types';
import CookiesAlerts from './CookiesAlerts';

interface AppState {
  diagnostics?: MouseflowDiagnostics;
  globals?: Partial<MouseflowGlobals>;
}

const App = function() {
  const [state, setState] = useState<AppState>({});

  useEffect(() => {
    chrome.runtime.sendMessage({ type: MouseflowEventType.FETCH_DIAGNOSTICS });
    chrome.runtime.sendMessage({ type: MouseflowEventType.FETCH_WINDOW_GLOBALS });
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
        case MouseflowEventType.RECEIVE_WINDOW_GLOBALS:
          setState({
            ...state,
            globals: response.payload,
          });
          break;
        
        default:
          break;
      }
    };

    chrome.runtime.onMessage.addListener(eventHandler);

    return () => chrome.runtime.onMessage.removeListener(eventHandler);
  });

  if (typeof state.diagnostics === 'undefined' || typeof state.globals === 'undefined') {
    return null;
  }

  return (
    <div className="App">
      <div className="container p-2">
        <Header version={state.diagnostics.version} isInstalled={state.diagnostics.isInstalled} />
        {state.diagnostics.isInstalled ? (
          <div>
            <DiagnosticsCard 
              isRecording={state.diagnostics.isRecording}
              recordingRate={state.diagnostics.recordingRate}
              websiteId={state.diagnostics.websiteId}
              sessionId={state.diagnostics.sessionId}
            />
            {state.globals ? (
              <div className="GlobalsCard card mb-4">
                <div className="card-header">
                  <h5 className="m-0">Global Variables</h5>
                </div>
                <ul className="list-group list-group-flush">
                  {Object.keys(state.globals).map((key) => {
                    if (typeof state.globals === 'undefined') {
                      return null;
                    }

                    return (<li className="list-group-item">{`${key} = ${state.globals[key]}`}</li>);
                  })}
                </ul>
              </div>
            ) : (
              null
            )}
            <CookiesAlerts cookies={state.diagnostics.cookies} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
