import React from "react";
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

function PrivateRoute({children}){
    const client = useApolloClient();

    const {user}  = client.readQuery({
        query: READ_USER,
    });

    return(
        <>
           { user.isLoggedIn? <Users/> : <Navigate to="/signIn" />}
        </>
    )
}

export default PrivateRoute