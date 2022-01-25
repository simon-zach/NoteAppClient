import React, {useState} from "react";
import {useQuery} from "@apollo/client"
import {Container, Col, Row,Card, Spinner, Alert} from "react-bootstrap"
import {GET_MY_USER_DATA} from "../GraphQL/Queries" 

function User(){
 
    const {loading,error,data} = useQuery(GET_MY_USER_DATA)

return(
    <>
        <br/>
        <h1>User data:</h1>
        {loading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
        {error && <Alert variant="danger">{`Error! ${error}`}</Alert>}
        <Container >
            <Row>
                    {data&&
                        <Card>
                            <Card.Header>
                                <Card.Img style={{width: '4rem'}} variant="top" src={data.me.avatar} />
                            </Card.Header>
                        
                            <Card.Body>
                                <Card.Title>Username: {data.me.username}</Card.Title>
                                <Card.Text>Id: {data.me.id}</Card.Text>
                                <Card.Text>Email: {data.me.email}</Card.Text>
                            </Card.Body>
                        </Card>
                    }
                    <br/>
            </Row>
        </Container>
    </>
)
}
export default User;