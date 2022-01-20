import React from "react";
import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import {useQuery, gql,useApolloClient} from '@apollo/client'
import { useNavigate,Link } from 'react-router-dom';



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
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {!user.isLoggedIn &&<Nav.Link href="/signIn">Log In</Nav.Link>}
            {!user.isLoggedIn &&<Nav.Link href="/signUp">Sign Up</Nav.Link>}
            {user.isLoggedIn&&<Nav.Link href="/Notes">Notes</Nav.Link>}
            {user.isLoggedIn&&<Nav.Link href="/Users">Users</Nav.Link>}
            {user.isLoggedIn && <Button variant="primary" onClick={logOut}>Wyloguj</Button>}
            {!user.isLoggedIn && <Button variant="primary" onClick={register}>Zarejestruj</Button>}
          </Nav>
        </Container>
      </Navbar>
      
        </>
    )
}
export default Navigation;