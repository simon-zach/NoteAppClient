import React from "react";
import {useQuery, gql} from "@apollo/client"

const GET_USERS = 
 gql`
  query{
      users {
        id
        username
    }}
  `


function Users() {
    const {data}= useQuery(GET_USERS)
    console.log(data)
  return (
  <div>
      {
        data.users.map(user=>{
            return <div>{user.username}</div>
        })
      }
  </div>
  );
}

export default Users;