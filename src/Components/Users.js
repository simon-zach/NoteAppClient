import React from "react";
import {useQuery, gql} from "@apollo/client"
import { ListGroup, Container, Row, Col,Card } from "react-bootstrap";

const GET_USERS = 
 gql`
  query{
      users {
        id
        username
        email
        avatar
    }}
  `


function Users() {

  
    const { loading, error, data}= useQuery(GET_USERS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>



     return (
      <Container> 

{data && data.users.map(user=>{ return (


<Row >
  <Col md="auto" >
      <Card style={{ width: '9rem' }}>
          <Card.Img variant="top" src={user.avatar} />
          <Card.Body>
              <Card.Title>{user.username}</Card.Title>
            
          </Card.Body>
      </Card>
      <br/>
  </Col>

  <Col >
      <ListGroup>
          <ListGroup.Item>Id: {user.id} </ListGroup.Item>
          <ListGroup.Item>Email: {user.email}</ListGroup.Item>
          <ListGroup.Item>Username: {user.username}</ListGroup.Item>
      </ListGroup>
    </Col>  
</Row> 



)   })} 
      </Container>
   
        
          
        
          
          
         
         
          
      

        
          
        
     

      
  );
}

export default Users;