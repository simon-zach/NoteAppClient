
import './App.css';
import Users from "./Components/Users"

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




function App() {
  return (
    <ApolloProvider client={client}>
      <Users></Users>
    </ApolloProvider>
  );
}

export default App;
