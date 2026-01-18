import Login from './pages/Login'; // <--- Import
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import AdminOrders from './pages/AdminOrders'; // <--- Import
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart'; // <--- Import Cart
import Navbar from './components/Navbar'; // <--- Import Navbar
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* <--- Add Navbar here so it shows on every page */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminOrders />} />
        <Route path="/" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> {/* <--- Add Route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;