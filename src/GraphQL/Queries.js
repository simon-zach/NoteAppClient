import {gql} from "@apollo/client"



export const READ_USER_FROM_CACHE = gql`
  query{
      user {
      isLoggedIn
      }
  }
`;

export const GET_MY_USER_DATA = 
    gql`
    query{
        me{
            id
            username
            email
            avatar
        }
     }
     `

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

export const GET_MY_NOTES = 
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
               favoriteCount
               favoritedBy{
                 id
                 username
                 email
                 avatar
               }
           }
       }
    }
    `
export const GET_ALL_NOTES = 
gql`
query {
        notes{
            id
            content
            createdAt
            title
            color
            favoriteCount
            favoritedBy{
              id
              username
              email
              avatar
            }
            author{
              avatar
              username
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
          favoritedBy{
            id
            username
            avatar
            email
          }
        }
    }
    `
export const READ_USER = gql`
    query  {
      user {
       isLoggedIn
      }
    }
  `