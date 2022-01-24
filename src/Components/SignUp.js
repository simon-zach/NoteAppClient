import React, {useState} from "react";
import {useMutation, gql, useApolloClient} from "@apollo/client"
import { useNavigate } from "react-router-dom";
import {Form, Button} from "react-bootstrap"
import {SIGNUP_USER, UPDATE_CACHE} from "../GraphQL/Mutations"

    

function SignUp() {
    let navigate = useNavigate();
    
 
    const client = useApolloClient()

    const [signUp, {loading, error}] = useMutation(SIGNUP_USER,{
        onCompleted: data =>{
            console.log(data.signUp);
            localStorage.setItem('token', data.signUp);
            //local buffer update
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
    loading && <p>Loading...</p>
    error && <p>Signup Error</p>

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
    <h1>Sign up!</h1>
    <Form onSubmit={onSubmit}>
        <Form.Label htmlFor="username">User name:</Form.Label><br/>
        <Form.Control required type="text" id="username" name="username" placeholder="User name" onChange={onChangeUsername}></Form.Control><br/>
        <Form.Label htmlFor="email">Email:</Form.Label><br/>
        <Form.Control required type="email" id="email" name="email" placeholder="Email adress" onChange={onChangeEmail}></Form.Control><br/>
        <Form.Label htmlFor="password">Password:</Form.Label><br/>
        <Form.Control required type="password" id="password" name="password" placeholder="Password" onChange={onChangePassword}></Form.Control><br/>
        <Button type="submit">Register</Button>
    </Form>
    
  </>
  );
}

export default SignUp;