import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Audios from './components/Audio/Audios';
import Tiktok from './Tiktok';
function App() {
  return (
 <>  



   <Router>



<Routes>
    
  
    <Route path='/' element={<Login />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/Home" element={<Home/>} />
    <Route path="/Audios" element={<Audios/>} />




</Routes>
</Router>


</> 
  );
}

export default App;
