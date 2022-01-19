import React from "react";
import {gql, useQuery} from "@apollo/client"

const GET_NOTES = 
    gql`
    query me {
       me{
           id
           username
           notes{
               content
           }
       }
    }
    
    `


function Notes(){

    const {loading, error, data} = useQuery(GET_NOTES)
    console.log(JSON.stringify(data))

    
    return(
        <>
           
        </>
    )

}
export default Notes;