import { render } from "react-dom";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./Components/SignUp";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const uri = process.env.REACT_APP_API_URI


const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache()
});

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
          </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  rootElement
);