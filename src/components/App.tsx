import React, { useEffect, useState } from 'react';
import Header from './Header';

import { MessageData } from '../types';

interface AppState {
  fetched: boolean; 
  data?: MessageData;
}

const App = function() {
  const [state, setState] = useState<AppState>({
    fetched: false,
  });

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function(message: MessageData, sender) {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTab = tabs[0];
        if (sender.tab?.id === activeTab.id) {
          setState({
            fetched: true,
            data: message,
          });
        }
      });
    }); 
  }, []);

  if (!state.fetched || typeof state.data === 'undefined') {
    return null;
  }

  return (
    <div className="App">
      <div className="container mt-4">
        <Header version={state.data.version} isInstalled={state.data.isInstalled} />
        {state.data.isInstalled ? (
          <div>
            <div className="Diagnostics card">
              <div className="card-header">
                <em>{`Diagnostics`}</em>
              </div>
              <ul className="diagnostics-list list-group list-group-flush">
                <li className="list-group-item">
                  <div>
                    {`Recording: `}<span className={state.data.isRecording ? "text-danger" : "text-secondary"}>{`${state.data.isRecording}`}</span>
                  </div>
                  <a 
                    className="btn btn-info"
                    href={`https://app.mouseflow.com/websites/${state.data.websiteId}/recordings/${state.data.sessionId}/play`} 
                    target="_blank"
                  >
                    {`View session`}<img className="ml-2" style={{ width: '1em' }} src="assets/images/external-link-duotone.svg" />
                  </a>
                </li>
                <li className="list-group-item">
                  <div>
                    {`Recording rate: `}<span className="text-info">{`${state.data.recordingRate}%`}</span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="input-group mr-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">{`Website ID: `}</span>
                    </div>
                    <input type="text" id="session-id" className="form-control" value={`${state.data.websiteId}`}/>
                  </div>
                  <button type="button" className="btn btn-secondary">Copy</button>
                </li>
                <li className="list-group-item">
                  <div className="input-group mr-1">
                    <div className="input-group-prepend">
                      <span className="input-group-text">{`Session ID: `}</span>
                    </div>
                    <input type="text" id="session-id" className="form-control" value={`${state.data.sessionId}`}/>
                  </div>
                  <button type="button" className="btn btn-secondary">Copy</button>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
