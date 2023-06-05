import React, { useState } from 'react';

import Session from './Session';

import Routes from './Routes';

function App() {

  const [isActive, setIsActive] = useState(true);

  return (
    <React.Fragment>
      <Session />
      <Routes />
    </React.Fragment>
  );
}

export default App;
