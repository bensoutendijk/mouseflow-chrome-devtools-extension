import React from 'react';

interface HeaderProps {
  isInstalled: boolean;
  version?: string;
}

const Header: React.FC<HeaderProps> = function({ isInstalled, version }) {
  return (
    <header className="Header">
      {isInstalled ? (
        <h4 className="text-success">{`Mouseflow ${version ? version : ''}`}</h4>
      ) : (
        <h4>{`Mouseflow does not appear to be installed on the page.`}</h4>
      )}
    </header>
  );
};

export default Header;
