import { RouterProvider, createBrowserRouter } from "react-router-dom" /*React Router Imports*/
import { About, Cart, Checkout, Error, HomeLayout, Landing, Login, Orders, Products, Register, SingleProduct } from "./pages/"
import { ErrorElement } from "./components"
import { loader as landingLoader } from '../src/pages/Landing'
import { loader as singleProductLoader } from '../src/pages/SingleProduct'

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
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
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
