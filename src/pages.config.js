
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Checkout from './pages/Checkout.jsx';
import __Layout from './Layout.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';


export const PAGES = {
    "Home": Home,
    "Products": Products,
    "ProductDetail": ProductDetail,
    "Checkout": Checkout,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
    login: Login,
    admin: Admin,
};