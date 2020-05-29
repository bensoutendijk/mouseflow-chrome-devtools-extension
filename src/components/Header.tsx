import React from 'react';

interface HeaderProps {
  isInstalled: boolean;
  version?: string;
}

const Header: React.FC<HeaderProps> = function({ isInstalled, version }) {
  if (!isInstalled) {
    return (
      <header>
        <h2>Mouseflow does not appear to be installed.</h2>
      </header>
    );
  }

  return (
    <header>
      <h2>{`Mouseflow ${version ? version : ''}`}</h2>
    </header>
  );
};

export default Header;
