import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CartPage from './components/CartPage';
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import AdminPanel from "./pages/AdminPanel";
import ClientPanel from "./pages/ClientPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/cliente" element={<ClientPanel />} />
            <Route path="/carrito" element={<CartPage />} />
          </Routes>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
