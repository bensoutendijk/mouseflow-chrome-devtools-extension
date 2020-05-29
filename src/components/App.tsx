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
  });

  if (!state.fetched || typeof state.data === 'undefined') {
    return null;
  }

  return (
    <Header version={state.data.version} isInstalled={state.data.isInstalled} />
  );
};

export default App;
