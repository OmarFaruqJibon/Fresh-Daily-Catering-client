import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Items from './pages/Items';
import CartPage from './pages/CartPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Bills from './pages/Bills';
import Customer from './pages/Customer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>

          } />
          <Route path='/items' element={
            <ProtectedRoute>
              <Items />
            </ProtectedRoute>
          } />
          <Route path='/cart' element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />

          <Route path='/bills' element={
            <ProtectedRoute>
              <Bills />
            </ProtectedRoute>
          } />
          <Route path='/customers' element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          } />

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}