
import './App.css';
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditContact from './pages/AddEditContact';
import EditContact from './pages/EditContact';
import Home from './pages/Home';
import AuthState from "./context/authContext/authState";
function App() {
  let token = JSON.parse(localStorage.getItem("myToken"))
  return (
    <AuthState>
      <Router>
        <div>
          <Navbar />
          <div className='container'>
            <Routes>
          
            
              <Route path='/' element={ <Login />} />
              <Route path='/register' element={ < Register />} />
              <Route path='/index' element={<Home />} />
              <Route path='/create' element={ < AddEditContact />} />
              <Route path='/edit/:id' element={ <EditContact />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthState>
   
    
  );
}

export default App;
