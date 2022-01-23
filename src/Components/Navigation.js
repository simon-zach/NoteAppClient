import React from "react";
import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import { gql,useApolloClient} from '@apollo/client'
import { useNavigate } from 'react-router-dom';

const READ_USER = gql`

  query  {
    user {
     isLoggedIn
    }
  }
`;

function Navigation() {
    const client = useApolloClient()
    const navigate = useNavigate();
  
    const logOut=() => {
      localStorage.removeItem('token')
      
      client.resetStore()
  
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
      navigate("/")
    }
  
    const register=(e) => {
      navigate("/signUp")
    }
    
  
    // Fetch the cached to-do item with ID 5
  const {user}  = client.readQuery({
    query: READ_USER,
    
  });
    return(
        <>

            
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Note App</Navbar.Brand>
          <Nav className="me-auto">
            {!user.isLoggedIn &&<Nav.Link href="/signIn">Log In</Nav.Link>}
            {!user.isLoggedIn &&<Nav.Link href="/signUp">Sign Up</Nav.Link>}
            {!user.isLoggedIn && <Button variant="primary" onClick={register}>Zarejestruj</Button>}
            {user.isLoggedIn&&<Nav.Link href="/Notes">My notes</Nav.Link>}
            {user.isLoggedIn&&<Nav.Link href="/Users">All users</Nav.Link>}
            {user.isLoggedIn&&<Nav.Link href="/User">My user data</Nav.Link>}
            {user.isLoggedIn && <Button variant="primary" onClick={logOut}>Wyloguj</Button>}
          </Nav>
        </Container>
      </Navbar>
      
        </>
    )
}
export default Navigation;