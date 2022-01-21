import { render } from "react-dom";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import PrivateRoute from "./Components/PrivateRoute";
import Users from "./Components/Users"
import Notes from "./Components/Notes"
import 'bootstrap/dist/css/bootstrap.min.css';
import User from "./Components/User"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql
} from "@apollo/client";

import {setContext} from 'apollo-link-context'


//Konfiguracja adresu URI Servera apollo
const uri = process.env.REACT_APP_API_URI;
const httpLink = createHttpLink({uri});
const cache = new InMemoryCache();

//Sprawdzenie tokena i zwrot nagłówków do kontekstu
const authLink = setContext((_,{headers}) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

const isLoggedIn = !!localStorage.getItem('token')

client.writeQuery({
  query: gql`
    query {
      user {
        isLoggedIn 
      }
    }`,
    data : {
      user: {
        isLoggedIn: isLoggedIn
      }
    },
  }, 
);

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/users" element={<PrivateRoute component={<Users />}/>}></Route>
              <Route path="/notes" element={<PrivateRoute component={<Notes />}/>}></Route>
              <Route path="/user" element={<User />}></Route> 
              <Route path="/SignUp" element={<SignUp />}></Route>
              <Route path="/SignIn" element={<SignIn />}></Route>
            </Route>
          </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  rootElement
);