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
    
     return (
      <div>
          {
          data && data.users.map(user=>{
                return <div>{user.username}</div>
            })
          }  
          {!data && <h2>No data</h2>}
      </div>
  );
}

export default Users;