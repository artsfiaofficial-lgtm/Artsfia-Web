import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import './App.css';
import ProductView from './pages/ProductView'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import AuthHome from './auth/AuthHome';
import NotFound from './pages/NotFound';
import SeeAllPage from './pages/SeeAllPage';
import ViewProductPage from './pages/ViewProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/wishlist' element={<Wishlist />}></Route>
        <Route path='/product' element={<Search />}></Route>
        <Route path='/view' element={<ProductView />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/auth' element={<AuthHome />}></Route>
        <Route path='/products' element={<SeeAllPage />}></Route>
        <Route path='/product-view' element={<ViewProductPage />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
