
import './App.css';
import Users from "./Components/Users"
import {useQuery, gql,useApolloClient} from '@apollo/client'
import { useNavigate,Link } from 'react-router-dom';

const READ_USER = gql`
  query  {
    user {
     isLoggedIn
    }
  }
`;


function App() {
  const client = useApolloClient()
  const navigate = useNavigate();

  const logOut=() => {
    localStorage.removeItem('token')
    
    client.resetStore()

    client.writeQuery({
      query: gql`
        query {
          user {
            isLoggedIn 
          }
        }`,
        data : {
          user: {
            isLoggedIn: false
          }
        },
      }, 
    );
    navigate("/")
  }

  const register=(e) => {
    navigate("/signUp")
  }
  

  // Fetch the cached to-do item with ID 5
const {user}  = client.readQuery({
  query: READ_USER,
  
});


  return (
    <div>
      <h1>Note App</h1>
      <nav>
        <Link to="/signUp">SignUp</Link> |{" "}
        <Link to="/signIn">SignIn</Link>
      </nav>
      {user.isLoggedIn && <button onClick={logOut}>Wyloguj</button>}
      {!user.isLoggedIn && <button onClick={register}>Zarejestruj</button>}
      
 
    </div>
    
  );
}

export default App;
