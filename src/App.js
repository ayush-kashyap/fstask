import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Comps/Home';
import GamePlay from './Comps/gamePlay';
import { useMyOwnContext } from './ContextAPI/UserContext';
import Signup from './Comps/Signup';
import Login from './Comps/Login';
import ErrorPage from './Comps/ErrorPage';


function App() {
  const {isLoggedIn}=useMyOwnContext()
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={isLoggedIn?<Home/>:<Signup/>}></Route>
      <Route path='/play-game' element={isLoggedIn?<GamePlay/>:<ErrorPage/>}></Route>
      <Route path='/login' element={isLoggedIn?<ErrorPage/>:<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
