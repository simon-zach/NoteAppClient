import React, { Children } from "react";
import { BrowserRouter,Routes, Route ,Navigate} from "react-router-dom";
import {useQuery, gql,useApolloClient} from '@apollo/client'
import Users from "./Users";

const READ_USER = gql`
  query  {
    user {
     isLoggedIn
    }
  }
`;

function PrivateRoute({component}){
    const client = useApolloClient();

    const  {loading, error, user}  = client.readQuery({
        query: READ_USER,
    });

    return(
        <>
            {loading&&<p>loading</p>}
           { !user.isLoggedIn ? <Navigate to="/signIn" />:component}
        </>
    )
}

export default PrivateRoute