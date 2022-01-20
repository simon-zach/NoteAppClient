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

  
    const { loading, error, data}= useQuery(GET_USERS)
    
     return (
      <div>
          {
          data && data.users.map(user=>{
                return <div key={user.id}>{user.username}</div>
            })
          }  
          
          {loading && <p>Wczytywanie</p>}
          {error && <p>Błąd</p>}

      </div>
  );
}

export default Users;