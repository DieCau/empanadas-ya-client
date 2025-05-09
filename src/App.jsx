import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import AdminPanel from "./pages/AdminPanel";
import CartPage from "./pages/CartPage";
import ClientPanel from "./pages/ClientPanel";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route
              path="/cliente"
              element={
                <PrivateRoute>
                  <ClientPanel />
                </PrivateRoute>
              }
            />
            <Route
              path="/carrito"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
