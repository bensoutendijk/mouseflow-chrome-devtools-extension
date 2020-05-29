import React from 'react';

interface HeaderProps {
  version?: string;
}

const Header: React.FC<HeaderProps> = function({ version }) {
  return (
    <h2>{`Mouseflow ${version}`}</h2>
  );
};

export default Header;
