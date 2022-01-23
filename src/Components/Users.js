import React from "react";
import {useQuery} from "@apollo/client"
import { ListGroup, Container, Row, Col,Card } from "react-bootstrap";
import {GET_USERS} from "../Queries/Queries"

function Users() {
    const { loading, error, data}= useQuery(GET_USERS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

     return (
      <Container> 
        {
        data && data.users.map(user=>{ 
            return(
                <>
                <br/>
                <Row key={user.id}>
                   <Card style={{ width: '6rem' }}>
                       <Card.Img variant="top" src={user.avatar} />
                   </Card>

                   <br/>
               
               

               <Col >
               <ListGroup>
                   <ListGroup.Item>Id: {user.id} </ListGroup.Item>
                   <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                   <ListGroup.Item>Username: {user.username}</ListGroup.Item>
               </ListGroup>
               </Col>  
           </Row>
                
                </> 
                )   
            })
        } 
      </Container>
  );
}

export default Users;