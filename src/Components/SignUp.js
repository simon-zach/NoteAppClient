import React, {useState} from "react";
import {useApolloClient,useMutation, gql} from "@apollo/client"



const SIGNUP_USER = 
    gql`
     mutation signUp ($username:String!,$email:String!,$password: String!){
       signUp (username:$username,email:$email,password:$password)  
       }
     `

function SignUp() {
    
    

    const [signUp, {loading, error}] = useMutation(SIGNUP_USER,{
        onCompleted: data =>console.log(data.signUp)
    })

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const onChangeUsername = (e) => {
        setUsername(e.target.value)  

    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value) 
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value) 
    }
    const onSubmit = (e) => {
        e.preventDefault();
        
        console.log(username+email+password)
        signUp({variables:{
            username:username,
            email:email,
            password:password,
        }})
        
    }
    
  return (
  <div>
      <h1>SignUp Form</h1>
      <form onSubmit={onSubmit}>
          <label htmlFor="username">Nazwa użytkownika:</label><br/>
          <input required type="text" id="username" name="username" placeholder="Nazwa użytkownika" onChange={onChangeUsername}></input><br/>
          <label htmlFor="email">Email:</label><br/>
          <input required type="email" id="email" name="email" placeholder="Adres email" onChange={onChangeEmail}></input><br/>
          <label htmlFor="password">Haslo:</label><br/>
          <input required type="password" id="password" name="password" placeholder="Hasło" onChange={onChangePassword}></input><br/>
          <button type="submit">Wyślij</button>
      </form>
  </div>
  );
}

export default SignUp;