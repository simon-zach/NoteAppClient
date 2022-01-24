import React from "react";
import Navigation from './Components/Navigation';
import { Container } from "react-bootstrap";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { gql,useApolloClient,useQuery} from '@apollo/client'




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
