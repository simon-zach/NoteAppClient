
import './App.css';
import Users from "./Components/Users"
import {useQuery, gql,useApolloClient} from '@apollo/client'

const READ_USER = gql`
  query  {
    user {
     isLoggedIn
    }
  }
`;




function App() {
  const client = useApolloClient()
  // Fetch the cached to-do item with ID 5
const user  = client.readQuery({
  query: READ_USER,
  
});
console.log(user)

  return (
    <div>
      <h1>app</h1>
    
      <Users></Users>
 
    </div>
    
  );
}

export default App;
