import React, {useState} from "react";
import {useMutation, gql, useApolloClient} from "@apollo/client"
import { useNavigate } from "react-router-dom";
import {Form, Button} from "react-bootstrap"


const SIGNUP_IN = gql`
    mutation signIn($username: String, $email: String, $password: String!){
        signIn (username:$username,email:$email,password:$password)  
    }
     `
     const UPDATE_CACHE = gql`
     query {
         user {
             isLoggedIn 
         }
     }`
function SignIn(){
    //Klient Apollo
    const client = useApolloClient()
    let navigate = useNavigate();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    
    const [signIn, {loading, error}] = useMutation(SIGNUP_IN,{
        onCompleted: data =>{
            console.log(data.signIn);
            localStorage.setItem('token', data.signIn);
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
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangeLogin = (e) => {
        setLogin(e.target.value)
    }
    const onSubmitForm = (e) => {
        e.preventDefault();
        
        signIn({variables:{
            username:login,
            email:login,
            password:password,
        }})
    }

    return(
        <>
        <h1>Log In:</h1>
        <Form onSubmit={onSubmitForm}>
            <Form.Label required htmlFor="login">Login:</Form.Label>
            <Form.Control type="text" id="login" name="login" placeholder="login" onChange={onChangeLogin}></Form.Control>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control required type="text" id="password" name="password" placeholder="password" onChange={onChangePassword}></Form.Control>
            <br/>
            <Button type="submit">Submit</Button>
        </Form>
        {loading && <p>Wczytywanie...</p>}
        {error && <p>Błąd podczas logowania!</p>}
        </>
    )
}

export default SignIn;