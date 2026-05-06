import Home from './pages/Home'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AdminLogin from './auth/AdminLogin';
import AddProduct from './pages/AddProduct';
import ClientManage from './pages/ClientManage';
import OrderView from './pages/OrderView';
import NotFound from './pages/NotFound'
import ProductView from './pages/ProductView';
import ProductDetails from './pages/ProductDetails';
function App() {
  //server link : https://backend-server-xvvb.onrender.com
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<AdminLogin/>}></Route>
        <Route path='/add' element={<AddProduct/>}></Route>
        <Route path='/clients' element={<ClientManage/>}></Route>
        <Route path='/orders' element={<OrderView/>}></Route>
        <Route path='/products' element={<ProductView/>}></Route>
        <Route path='/details' element={<ProductDetails/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
