import { RouterProvider, createBrowserRouter } from "react-router-dom" /*React Router Imports*/
import { About, Cart, Checkout, Error, HomeLayout, Landing, Login, Orders, Products, Register, SingleProduct } from "./pages/"
import { ErrorElement } from "./components"
import { loader as landingLoader } from './pages/Landing'
import { loader as singleProductLoader } from './pages/SingleProduct'
import { loader as productsLoader } from './pages/Products'
import { loader as checkoutLoader } from './pages/Checkout'
import { loader as ordersLoader } from './pages/Orders'
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as checkoutAction } from './components/CheckoutForm'
import { store } from "./store"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

//Query client creation. Set default query keep time.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5 /*Time react query will preserve queries*/
    }
  }
});

/*Router and routes creation*/
const router = createBrowserRouter([
  {
    //Parent path. enable outlet use to show children and share content.
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient)
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
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient)
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: ordersLoader(store, queryClient)
      },
      {
        path: 'products',
        element: <Products />,
        loader: productsLoader(queryClient)
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: singleProductLoader(queryClient)
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
    {/*Wrap router provider into query client provider*/}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} /> {/*Pass in router configuration to Router Provider */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  )
}

export default App
