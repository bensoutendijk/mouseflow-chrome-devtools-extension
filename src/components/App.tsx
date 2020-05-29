import React, { useEffect, useState } from 'react';
import Header from './Header';

import { MessageData } from '../types';

const App = function() {
  const [data, setData] = useState<MessageData>({
    isInstalled: false,
    domain: window.location.host,
  });

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function(message: MessageData, sender) {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTab = tabs[0];
        if (sender.tab?.id === activeTab.id) {
          setData(message);
        }
      });
    }); 
  });

  return (
    <Header version={data.version} />
  );
};

export default App;
