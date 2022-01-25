import { render } from "react-dom";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import PrivateRoute from "./Components/PrivateRoute";
import Users from "./Components/Users"
import MyNotes from "./Components/MyNotes"
import 'bootstrap/dist/css/bootstrap.min.css';
import User from "./Components/User"
import EditNote from "./Components/EditNote"
import AllNotes from "./Components/AllNotes"
import Home from "./Pages/Home"
import LoggedOut from "./Pages/LoggedOut";
import LoggedHome from "./Pages/LoggedHome";
import {setContext} from 'apollo-link-context'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql
  
} from "@apollo/client";


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
        isLoggedIn: isLoggedIn,
      }
    },
  }, 
);

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>}>
              <Route index element={<Home />} />
              <Route path="/users" element={<PrivateRoute component={<Users />}/>}></Route>
              <Route path="/myNotes" element={<PrivateRoute component={<MyNotes/>}/>}></Route>
              <Route path="/allNotes" element={<PrivateRoute component={<AllNotes />}/>}></Route>
              <Route path="/editNote" element={<PrivateRoute component={<EditNote />}/>}>
                 <Route path=":noteId" element={<EditNote />} />
              </Route>
              <Route path="/user" element={<User />}></Route> 
              <Route path="/SignUp" element={<SignUp />}></Route>
              <Route path="/SignIn" element={<SignIn />}></Route>
              <Route path="/loggedOut" element={<LoggedOut />}></Route>
              <Route path="/loggedHome" element={<LoggedHome />}></Route>
            </Route>
          </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  rootElement
);