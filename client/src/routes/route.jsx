import ProtectedRoute from "../components/Site/ProtectedRoute";
import AdminRoot from "../pages/Admin/AdminRoot";
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import About from "../pages/Site/About";
import Cart from "../pages/Site/Cart";
import Home from "../pages/Site/Home";
import Login from "../pages/Site/Login";
import ProductDetails from "../pages/Site/ProductDetails";
import Profile from "../pages/Site/Profile";
import Register from "../pages/Site/Register";
import SiteRoot from "../pages/Site/SiteRoot";
import UpdatePassword from "../pages/Site/UpdatePassword";
import UpdateProfile from "../pages/Site/UpdateProfile";
import UploadAvatar from "../pages/Site/UploadAvatar";

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
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      },
      {
        path: "me/profile",
        element: <ProtectedRoute> <Profile/> </ProtectedRoute> 
      },
      {
        path: "me/update_profile",
        element: <ProtectedRoute> <UpdateProfile/></ProtectedRoute> 
      },
      {
        path: "me/upload_avatar",
        element: <ProtectedRoute><UploadAvatar/></ProtectedRoute> 
      },
      {
        path: "me/update_password",
        element: <ProtectedRoute><UpdatePassword/></ProtectedRoute> 
      },
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
