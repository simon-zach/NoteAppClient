import React from "react";
import {useQuery} from "@apollo/client"
import { ListGroup, Container, Row, Col,Card,Table } from "react-bootstrap";
import {GET_USERS} from "../GraphQL/Queries"



function Users() {
    const { loading, error, data}= useQuery(GET_USERS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

/*
const funkcja=()=>{
     return(
                <Table key={user.id} striped bordered hover>
            
            <tbody>
              <tr>
                <td><img src={user.avatar}></img></td>
                <td>     
                <ListGroup >
                    <ListGroup.Item >Id: {user.id} </ListGroup.Item>
                    <ListGroup.Item >Email: {user.email}</ListGroup.Item>
                    <ListGroup.Item >Username: {user.username}</ListGroup.Item>
                </ListGroup>
                </td>
              </tr>
            
              
            </tbody>
          </Table>
            )
    
}
*/
     return (
      <Container> <br />
        {
        data && data.users.map(user=>{ 
            return(
                <Row  key={user.id} style={{ marginBottom: '1rem' }}>
                    <br />
                    <Card >
                        <Card.Header><Card.Img  style={{width: '4rem'}} variant="top" src={user.avatar} /> {user.username}</Card.Header>
                        <Card.Body>
                            <Card.Text>Id: {user.id}</Card.Text>
                            <Card.Text>Email: {user.email}</Card.Text>
                            <Card.Text>Username: {user.username}</Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                  
                </Row>
                ) 
           
            })
        } 
      </Container>
  );
}

export default Users;