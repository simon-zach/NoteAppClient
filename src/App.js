import React from "react";
import Navigation from './Components/Navigation';

import { Routes, Route, Outlet, Link } from "react-router-dom";




function App() {
 



  return (
    <>
      <Navigation></Navigation>
      <Outlet />
    </>
  );
}

export default App;
