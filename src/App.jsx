import React , {useState} from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import './Pages/Video/Videos'
import Navbar from './Components/Navbar/Navbar';
import Video from './Pages/Video/Videos';
function App() {

  const [sidebar, setSidebar] = useState();
  
  return (
    <>
      
        <Navbar setSidebar={setSidebar}/>
        <Routes>
          <Route path='/' element={<Home sidebar ={sidebar}/>} />
          <Route path='/video/:categoryId/:videoId' Component={()=><Video/>} />
        </Routes>


    
    </>
  );
}

export default App;
