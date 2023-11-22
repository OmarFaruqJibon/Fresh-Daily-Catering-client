import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Items from './pages/Items';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/items' element={<Items />} />
          <Route path='/cart' element={<CartPage />} />



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

