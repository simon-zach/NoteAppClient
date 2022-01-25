import React from "react";
import {Navigate} from "react-router-dom";
import {useApolloClient} from '@apollo/client'
import {READ_USER} from "../GraphQL/Queries"
import {Spinner, Alert} from "react-bootstrap"

function PrivateRoute({component}){
  
    const client = useApolloClient();

    const  {loading, error, user}  = client.readQuery({
        query: READ_USER,
    });

    return(
        <>
           {(loading) && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
           {error && <Alert variant="danger">{`Error! ${error}`}</Alert>}
           { !user.isLoggedIn ? <Navigate to="/signIn" />:component}
        </>
    )
}

export default PrivateRoute