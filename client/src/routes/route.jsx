import AdminRoot from "../pages/Admin/AdminRoot";
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import About from "../pages/Site/About";
import Cart from "../pages/Site/Cart";
import Home from "../pages/Site/Home";
import ProductDetails from "../pages/Site/ProductDetails";
import SiteRoot from "../pages/Site/SiteRoot";

export const ROUTES = [
  {
    path: "/",
    element:<SiteRoot/> ,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "cart",
        element: <Cart/>
      },
      {
        path: "product/:id",
        element: <ProductDetails/>
      }
    ],
  },
  {
    path: "/admin",
    element:<AdminRoot />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products/>
      }
    ],
  },
];
