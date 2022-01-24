import React, {useState} from "react";
import {gql,useQuery} from "@apollo/client"
import {Container, Col, Row,Card,ListGroup} from "react-bootstrap"
import {GET_MY_USER_DATA} from "../GraphQL/Queries" 



function User(){
    const [userData,setUserData] = useState()
    const {loading,error,data} = useQuery(GET_MY_USER_DATA, {
        onCompleted: data =>{
            setUserData(userData)
           
        }
    })
    if (loading){
        return <p>loading</p>
    }

    if (error){
        return <p>error</p>
    }

return(
    <>
    <br/>
    <h1>User data:</h1>
        <Container >
            <Row >
                <Col md="auto" >
                    <Card>
                        <Card.Img variant="top" src={data.me.avatar} />
                        <Card.Body>
                            <Card.Title>{data.me.username}</Card.Title>
                           
                        </Card.Body>
                    </Card>
                    <br/>
                </Col>
                
              
                <Col >
                <ListGroup>
                    <ListGroup.Item>Id: {data.me.id} </ListGroup.Item>
                    <ListGroup.Item>Email: {data.me.email}</ListGroup.Item>
                    <ListGroup.Item>Username: {data.me.username}</ListGroup.Item>
                 
                </ListGroup>
                </Col>
            </Row>
        </Container>
    </>
)
}
export default User;