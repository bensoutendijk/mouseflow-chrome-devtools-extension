import React from 'react';

interface CookiesAlertsProps {
  cookies: { [key: string]: string | undefined };
}

const CookiesAlerts: React.FC<CookiesAlertsProps> = function({ cookies }) {
  return (
    <div className="CookiesAlerts">
      {typeof cookies.mfUser === 'undefined' ? (
        <div className="alert alert-danger">mouseflow user cookie is not set.</div>
      ) : (
        null
      )}
      {typeof cookies.mfSession === 'undefined' ? (
        <div className="alert alert-danger">mouseflow session cookie is not set.</div>
      ) : (
        null
      )}
    </div>
  );
};

export default CookiesAlerts;
