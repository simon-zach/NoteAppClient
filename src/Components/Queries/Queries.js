import {gql} from "@apollo/client"

export const CREATE_NOTE = gql`
mutation($content: String!){
   newNote(content: $content) {
     id
     content
   }
 }
    `
export const GET_NOTES = 
    gql`
    query  {
       me{
           id
           username
           notes{
               id
               content
           }
       }
    }
    `
