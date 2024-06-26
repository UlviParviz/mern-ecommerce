import Invoice from "../components/Site/Invoice";
import ProtectedRoute from "../components/Site/ProtectedRoute";
import NotFound from "../layouts/Site/NotFound";
import AdminRoot from "../pages/Admin/AdminRoot";
import Dashboard from "../pages/Admin/Dashboard";
import ListOrders from "../pages/Admin/ListOrders";
import ListProducts from "../pages/Admin/ListProducts";
import ListUsers from "../pages/Admin/ListUsers";
import NewProduct from "../pages/Admin/NewProduct";
import ProcessOrder from "../pages/Admin/ProcessOrder";
import ProductReviews from "../pages/Admin/ProductReviews";
import UpdateProduct from "../pages/Admin/UpdateProduct";
import UpdateUser from "../pages/Admin/UpdateUser";
import UploadImages from "../pages/Admin/UploadImages";
import About from "../pages/Site/About";
import Cart from "../pages/Site/Cart";
import ConfirmOrder from "../pages/Site/ConfirmOrder";
import ForgotPassword from "../pages/Site/ForgotPassword";
import Home from "../pages/Site/Home";
import Login from "../pages/Site/Login";
import OrderDetails from "../pages/Site/OrderDetails";
import Orders from "../pages/Site/Orders";
import PaymentMethod from "../pages/Site/PaymentMethod";
import ProductDetails from "../pages/Site/ProductDetails";
import Profile from "../pages/Site/Profile";
import Register from "../pages/Site/Register";
import ResetPassword from "../pages/Site/ResetPassword";
import Shipping from "../pages/Site/Shipping";
import SiteRoot from "../pages/Site/SiteRoot";
import UpdatePassword from "../pages/Site/UpdatePassword";
import UpdateProfile from "../pages/Site/UpdateProfile";
import UploadAvatar from "../pages/Site/UploadAvatar";

export const ROUTES = [
  {
    path: "/",
    element: <SiteRoot />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "shipping",
        element: (
          <ProtectedRoute>
            {" "}
            <Shipping />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "confirm_order",
        element: (
          <ProtectedRoute>
            {" "}
            <ConfirmOrder />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "payment_method",
        element: (
          <ProtectedRoute>
            {" "}
            <PaymentMethod />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "password/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "password/reset/:token",
        element: <ResetPassword />,
      },
      {
        path: "me/profile",
        element: (
          <ProtectedRoute>
            {" "}
            <Profile />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "me/orders",
        element: (
          <ProtectedRoute>
            {" "}
            <Orders />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "me/order/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <OrderDetails />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "invoice/order/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <Invoice />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "me/update_profile",
        element: (
          <ProtectedRoute>
            {" "}
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "me/upload_avatar",
        element: (
          <ProtectedRoute>
            <UploadAvatar />
          </ProtectedRoute>
        ),
      },
      {
        path: "me/update_password",
        element: (
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute admin = {true}><Dashboard /></ProtectedRoute> ,
      },
      {
        path: "products",
        element: <ProtectedRoute admin= {true}><ListProducts/></ProtectedRoute>,
      },
      {
        path: "product/new",
        element: <ProtectedRoute admin= {true}><NewProduct/></ProtectedRoute>,
      },
      {
        path: "products/:id",
        element: <ProtectedRoute admin= {true}><UpdateProduct/></ProtectedRoute>,
      },
      {
        path: "products/:id/upload_images",
        element: <ProtectedRoute admin= {true}><UploadImages/></ProtectedRoute>,
      },
      {
        path: "orders",
        element: <ProtectedRoute admin= {true}><ListOrders/></ProtectedRoute>,
      },
      {
        path: "users",
        element: <ProtectedRoute admin= {true}><ListUsers/></ProtectedRoute>,
      },
      {
        path: "reviews",
        element: <ProtectedRoute admin= {true}><ProductReviews/></ProtectedRoute>,
      },
      {
        path: "users/:id",
        element: <ProtectedRoute admin= {true}><UpdateUser/></ProtectedRoute>,
      },
      {
        path: "orders/:id",
        element: <ProtectedRoute admin= {true}><ProcessOrder/></ProtectedRoute>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
