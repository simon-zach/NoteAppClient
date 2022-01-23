import {gql} from "@apollo/client"



export const GET_USERS = 
 gql`
  query{
      users {
        id
        username
        email
        avatar
    }}
  `

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
    query {
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

export const GET_NOTE = 
    gql`
    query ($id: ID!){
        note(id: $id){
          title,
          content,
          color
        }
    }
    `

export const DELETE_NOTE = 
    gql`
    mutation($id: ID!){
      deleteNote(id: $id)
    }
    `


export const SIGNUP_USER = gql`
mutation signUp ($username:String!,$email:String!,$password: String!){
    signUp (username:$username,email:$email,password:$password)  
}
  `

export const UPDATE_CACHE = gql`
query {
    user {
        isLoggedIn 
    }
}`

export const UPDATE_NOTE = gql`
mutation updateNote($id: ID!, $content: String!, $title: String!,$color: Int!){
  updateNote(id: $id, content: $content, title: $title, color: $color){
      id
      content
      title
      color
  }
}
`