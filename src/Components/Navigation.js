import React, { useEffect } from "react";
import {gql,useApolloClient,useQuery,useLazyQuery} from '@apollo/client'
import {useNavigate } from 'react-router-dom';
import {Button, Nav, Navbar, Container, Spinner, Alert } from 'react-bootstrap';
import {READ_USER_FROM_CACHE, GET_MY_USER_DATA} from "../GraphQL/Queries"

function Navigation() {

  const client = useApolloClient()
  const navigate = useNavigate();

  const logOut=() => {
    localStorage.removeItem('token')
    client.cache.reset()

    client.writeQuery({
      query: gql`
        query {
          user {
            isLoggedIn 
          }
        }`,
        data : {
          user: {
            isLoggedIn: false
          }
        },
      }, 
    );
    navigate("/LoggedOut")
  }

  const {user}  = client.readQuery({
    query: READ_USER_FROM_CACHE
  });

  const {error,loading,data} = useQuery(GET_MY_USER_DATA)
 

  return(
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            {(loading) && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
            <Navbar.Brand href="/"><img style={{ width: '5rem' }} src="/noteAppLogo.png"></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {user.isLoggedIn&&<Nav.Link href="/User">{data&&<img style={{ width: '3rem' }} src={data.me.avatar}></img>}</Nav.Link>}
                {!user.isLoggedIn &&<Nav.Link href="/signIn">Log In</Nav.Link>}
                {!user.isLoggedIn &&<Nav.Link href="/signUp">Sign Up</Nav.Link>}
                {user.isLoggedIn&&<Nav.Link href="/mynotes">My notes</Nav.Link>}
                {user.isLoggedIn&&<Nav.Link href="/allnotes">All notes</Nav.Link>}
                {user.isLoggedIn&&<Nav.Link href="/users">All users</Nav.Link>}
              </Nav>
              <Nav>
                {user.isLoggedIn && <Button variant="primary" onClick={logOut}>Log out</Button>} 
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
}
export default Navigation;