import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import Layout from './Components/Layout/layout'
import Home from './Components/Home/home.jsx';
import Product from './Components/Product_Details/Product.jsx';
import AllProducts from './Components/AllProducts/Allproducts.jsx'
import Cart from './Components/Cart/Cart'
import Authentication from './Components/authentication/Authentication.jsx';
import { Provider } from 'react-redux'
import { store } from './Components/Redux/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<Home />} />
      <Route path='product-details/:id' element={<Product />} />
      <Route path='all-products' element={<AllProducts />} />
      <Route path='cart' element={<Cart />} />
      <Route path='auth' element={<Authentication />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
