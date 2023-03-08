import React from 'react';
import MetaDash from './MetaDash';
import SiteBanner from './SiteBanner';
import {fortunize} from "./FortunoffApp";

function App() {
  const FortunizedApp = fortunize(MetaDash)
  return (
    <div className="App">
      <SiteBanner></SiteBanner>
      <FortunizedApp></FortunizedApp>
    </div>
  );
}

export default App;
