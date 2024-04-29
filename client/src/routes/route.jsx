import AdminRoot from "../pages/Admin/AdminRoot";
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import About from "../pages/Site/About";
import Home from "../pages/Site/Home";
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
