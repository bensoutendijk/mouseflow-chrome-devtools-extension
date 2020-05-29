import React, { useEffect, useState } from 'react';
import Header from './Header';
import DiagnosticsCard from './DiagnosticsCard';

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
            <DiagnosticsCard 
              isRecording={state.data.isRecording}
              recordingRate={state.data.recordingRate}
              websiteId={state.data.websiteId}
              sessionId={state.data.sessionId}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
