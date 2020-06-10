import React, { useEffect, useState } from 'react';
import Header from './Header';
import DiagnosticsCard from './DiagnosticsCard';

import { MouseflowEventDetail,
  MouseflowDiagnostics, 
  MouseflowEventType, 
} from '../types';

interface AppState {
  diagnostics?: MouseflowDiagnostics;
}

const App = function() {
  const [state, setState] = useState<AppState>({});

  const copyInput: React.MouseEventHandler = function(event) {
    event.preventDefault();
            
    const element = event.target as HTMLButtonElement;
    const dataTarget = element.getAttribute('data-target');
    if (dataTarget === null) {
      return;
    }
        
    const target = document.getElementById(dataTarget) as HTMLInputElement;
    if (target === null) {
      return;
    }
            
    // Copy the text
    target.select();
    document.execCommand('copy');
            
    // Change the button text temporarily
    const originalText = element.innerText;
    element.innerText = 'Copied';
    setTimeout(() => { 
      element.innerText = originalText;
    }, 2000);
  };

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

  // Display "not installed" message
  if (state.diagnostics.installations.length === 0) {
    return (
      <div className="App">
        <div className="container p-2">
          <h4>Mouseflow does not appear to be installed on the page.</h4>
        </div>
      </div>
    );
  }


  // Display "null script" message
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
          <div className="row">
            <div className="input-group mr-1">
              <div className="input-group-prepend">
                <span className="input-group-text">{`Website ID: `}</span>
              </div>
              <input type="text" id="website-id" className="form-control" value={state.diagnostics.installations[0]}/>
              <div className="input-group-append">
                <button type="button" className="btn btn-secondary" onClick={copyInput} data-target="website-id">Copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container p-2">
        <Header version={state.diagnostics.version} />
        <div className="CriticalAlerts alert-group">
          <div className="CriticalAlerts alert-group">
            {state.diagnostics.installations.length > 1 ? (
              <div className="alert alert-danger">
                More than one tracking code detected.
                <ul>
                  {state.diagnostics.installations.map((id) => (
                    <li>{id}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {typeof state.diagnostics.cookies.mfUser === 'undefined' ? (
              <div className="alert alert-danger"><strong>User cookie is not set.</strong></div>
            ) : null}
            {typeof state.diagnostics.cookies.mfSession === 'undefined' ? (
              <div className="alert alert-danger"><strong>Session cookie is not set.</strong></div>
            ) : null }
          </div>
          <div className="WarningAlerts alert-group">
            {state.diagnostics.duplicateIds.length > 0 ? (
              <div className="alert alert-warning">
                <p className="mb-1"><strong>Duplicate HTML IDs found.</strong></p>
                {state.diagnostics.duplicateIds
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((id) => (
                    <a href="#" className="badge badge-warning">#{id}</a>
                  ))}
              </div>
            ) : null}
            {state.diagnostics.HTMLErrors.length ? (
              <div className="alert alert-warning">
                <p className="mb-1"><strong>Invalid HTML: </strong></p>
                {state.diagnostics.HTMLErrors
                  .map((error) => (
                    <a href="#" className="badge badge-warning">{error}</a>
                  ))}
              </div>
            ) : null}
          </div>
          {/* <div className="InfoAlerts alert-group">
            {state.diagnostics.cookies ? (
              <div className="alert alert-info">
                
              </div>
            ) : null}
          </div> */}
          <DiagnosticsCard 
            isRecording={state.diagnostics.isRecording}
            recordingRate={state.diagnostics.recordingRate}
            websiteId={state.diagnostics.websiteId}
            sessionId={state.diagnostics.sessionId}
          />
            
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

                return (<li className="list-group-item" style={{ fontFamily: 'monospace' }}>{`${key} = ${value}`}</li>);
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
