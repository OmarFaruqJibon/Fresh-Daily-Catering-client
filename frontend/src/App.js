import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Items from './pages/Items';

function App() {
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/items' element={<Items/>}/>



      </Routes>
    
    
    
    </BrowserRouter>
      
    </>
  );
}

export default App;

