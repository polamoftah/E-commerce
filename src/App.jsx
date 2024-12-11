import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Payment from "./components/Payment/Payment";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Brands from "./components/Brands/Brands";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/Notfound/Notfound";
import Products from "./components/products/products";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Productdetails from "./components/productdetails/Productdetails";
import { usercountext, UserContext } from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextprovider from "./Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import Categories from "./components/Categories/Categories";
import Categoriesdetails from "./components/Categoriesdetails/Categoriesdetails";
import Branddetails from "./components/Branddetails/Branddetails";
import Wishlistcontext from "./Context/Wishlistcontext";
import Wishlist from "./components/Wishlist/Wishlist";
import { Offline, Online } from "react-detect-offline";
let client = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "Categories", element: <Categories /> },
      {
        path: "Branddetails/:id",
        element: (
          <ProtectedRoute>
            <Branddetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categoriesdetails/:id/:name",
        element: (
          <ProtectedRoute>
            <Categoriesdetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "footer", element: <Footer /> },
      {
        path: "Wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "Payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },

      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <Productdetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  // If you don't need to use the context directly here, remove this line
  const user = useContext(usercountext);

  return (
    <>
      <online>
        <UserContext>
          <CartContextprovider>
            <Wishlistcontext>
              <QueryClientProvider client={client}>
                <RouterProvider router={router} />
                <Toaster />
                <ReactQueryDevtools />
              </QueryClientProvider>
            </Wishlistcontext>
          </CartContextprovider>
        </UserContext>
      </online>
      <Offline>failed connection</Offline>
    </>
  );
}

export default App;
