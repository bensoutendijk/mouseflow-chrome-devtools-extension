import React, { useEffect, useState } from 'react';
import Header from './Header';
import DiagnosticsCard from './DiagnosticsCard';

import { MouseflowEventDetail,
  MouseflowDiagnostics, 
  MouseflowEventType, 
} from '../types';
import CookiesAlerts from './CookiesAlerts';

interface AppState {
  diagnostics?: MouseflowDiagnostics;
}

const App = function() {
  const [state, setState] = useState<AppState>({});

  useEffect(() => {
    const eventHandler = function(message: MouseflowEventDetail) {
      chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        const activeTab = tabs[0];
        if (activeTab && activeTab.id) {
          switch (message.type) {
            case MouseflowEventType.RECEIVE_DIAGNOSTICS:
              setState({
                ...state,
                diagnostics: message.payload,
              });
              break;
            default:
              break;
          }
        }
      });
    };

    chrome.runtime.onMessage.addListener(eventHandler);

    return () => chrome.runtime.onMessage.removeListener(eventHandler);
  }, []);

  if (typeof state.diagnostics === 'undefined') {
    return null;
  }


  // Check for null script
  if (state.diagnostics.websiteId === null) {
    return (
      <div className="App">
        <div className="container p-2">
          <h6>Null script detected. Please check for the following:</h6>
          <ul>
            <li>Tracking paused for the account</li>
            <li>Account is out of credits</li>
            <li>Recording limit met for this website</li>
          </ul>
        </div>
      </div>
    );
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
            {state.diagnostics.globals ? (
              <div className="GlobalsCard card mb-4">
                <div className="card-header">
                  <h5 className="m-0">Global Variables</h5>
                </div>
                <ul className="list-group list-group-flush">
                  {Object.keys(state.diagnostics.globals).map((key) => {
                    const value = state.diagnostics?.globals[key];
                    if (!value) {
                      return null;
                    }

                    return (<li className="list-group-item">{`${key} = ${value}`}</li>);
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
