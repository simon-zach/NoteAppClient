import React from "react";
import {useQuery} from "@apollo/client"
import {Container, Row,Card,Spinner,Alert } from "react-bootstrap";
import {GET_USERS} from "../GraphQL/Queries"

function Users() {
    const { loading, error, data}= useQuery(GET_USERS)

     return (
      <>
        {(loading) && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
        {error && <Alert variant="danger">{`Error! ${error}`}</Alert>}
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
      </>
  );
}

export default Users;