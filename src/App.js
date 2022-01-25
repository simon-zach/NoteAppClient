import React from "react";
import Navigation from './Components/Navigation';
import {Container } from "react-bootstrap";
import {Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navigation ></Navigation>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
