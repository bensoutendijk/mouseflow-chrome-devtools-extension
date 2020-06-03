import React from 'react';
import SessionControls from './SessionControls';

interface DiagnosticsCardProps {
  isRecording?: boolean;
  websiteId?: string;
  sessionId?: string;
  recordingRate?: number;
}

const DiagnosticsCard: React.FC<DiagnosticsCardProps> = function({ isRecording, websiteId, sessionId, recordingRate }) {

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

  return (
    <div className="DiagnosticsCard card mb-4">
      <div className="card-header">
        <h5 className="m-0">Diagnostics</h5>
      </div>
      <ul className="diagnostics-list list-group list-group-flush">
        <li className="list-group-item">
          <SessionControls isRecording={!!isRecording} />
          <a 
            className="btn btn-info"
            href={`https://app.mouseflow.com/websites/${websiteId}/recordings/${sessionId}/play`} 
            target="_blank"
          >
            {`View session`}<img className="ml-2" style={{ width: '1em' }} src="assets/images/external-link-duotone.svg" />
          </a>
        </li>
        <li className="list-group-item">
          <div>
            {`Recording rate: `}<span className="text-info">{`${recordingRate}%`}</span>
          </div>
        </li>
        <li className="list-group-item">
          <div className="input-group mr-1">
            <div className="input-group-prepend">
              <span className="input-group-text">{`Website ID: `}</span>
            </div>
            <input type="text" id="website-id" className="form-control" value={`${websiteId}`}/>
          </div>
          <button type="button" className="btn btn-secondary" onClick={copyInput} data-target="website-id">Copy</button>
        </li>
        <li className="list-group-item">
          <div className="input-group mr-1">
            <div className="input-group-prepend">
              <span className="input-group-text">{`Session ID: `}</span>
            </div>
            <input type="text" id="session-id" className="form-control" value={`${sessionId}`}/>
          </div>
          <button type="button" className="btn btn-secondary" onClick={copyInput} data-target="session-id">Copy</button>
        </li>
      </ul>
    </div>
  );
};

export default DiagnosticsCard;
