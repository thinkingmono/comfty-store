import { RouterProvider, createBrowserRouter } from "react-router-dom" /*React Router Imports*/
import { About, Cart, Checkout, Error, HomeLayout, Landing, Login, Orders, Products, Register, SingleProduct } from "./pages/"
import { ErrorElement } from "./components"
import { loader as landingLoader } from '../src/pages/Landing'
import { loader as singleProductLoader } from '../src/pages/SingleProduct'
import { loader as productsLoader } from '../src/pages/Products'
import { action as registerAction } from '../src/pages/Register'
import { action as loginAction } from '../src/pages/Login'
import { store } from "./store"

/*Router and routes creation*/
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'products',
        element: <Products />,
        loader: productsLoader
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: singleProductLoader
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store)
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} /> {/*Pass in router configuration to Router Provider */}
    </>
  )
}

export default App
