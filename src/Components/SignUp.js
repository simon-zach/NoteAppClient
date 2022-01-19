import React, {useState} from "react";
import {useMutation, gql, useApolloClient} from "@apollo/client"
import { useNavigate } from "react-router-dom";


const SIGNUP_USER = gql`
    mutation signUp ($username:String!,$email:String!,$password: String!){
       signUp (username:$username,email:$email,password:$password)  
    }
     `

const UPDATE_CACHE = gql`
    query {
        user {
            isLoggedIn 
        }
    }`

    

function SignUp() {
    let navigate = useNavigate();
    
    //Klient Apollo
    const client = useApolloClient()

    const [signUp, {loading, error}] = useMutation(SIGNUP_USER,{
        onCompleted: data =>{
            console.log(data.signUp);
            localStorage.setItem('token', data.signUp);
            //uaktualnienie bufora lokalnego
            client.writeQuery({
                query: UPDATE_CACHE,
                    data : {
                    user: {
                        isLoggedIn: true
                    }
                    },
                }, 
            );
            navigate("/");
        }
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
        
        signUp({variables:{
            username:username,
            email:email,
            password:password,
        }})
        
    }
    
  return (
  <>
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
    {loading && <p>Wczytywanie...</p>}
    {error && <p>Błąd podczas rejestracji!</p>}
  </>
  );
}

export default SignUp;