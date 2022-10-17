
import './App.css';

import {Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./pages/HomePage"
import AddPage from "./pages/AddPage"
import EditPage from "./pages/EditPage"
import DetailPage from "./pages/DetailPage"
import AuthPage from "./pages/AuthPage"

import Navbar from "./components/Navbar"
import Login from "./pages/Login"


import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="App">
    <Navbar/>
      <ToastContainer />

      <Routes>
    
          <Route path='/' element={<HomePage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/create' element={<AddPage />} />
          <Route path='/edit/:id' element={<EditPage />} />
    
            <Route path='/register' element={<AuthPage />} />
            <Route path='/login' element={<Login />} />
       
      </Routes>
    </div>
  );
}

export default App;
