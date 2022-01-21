import {gql} from "@apollo/client"

export const CREATE_NOTE = gql`
mutation($content: String! $title: String! $color: Int!){
   newNote(content: $content title: $title color: $color) {
     id
     content
     createdAt
     title
     color
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
               createdAt
               title
               color
           }
       }
    }
    `
