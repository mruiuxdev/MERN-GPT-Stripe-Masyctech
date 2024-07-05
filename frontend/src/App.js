import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAuth } from "./AuthContext/AuthContext";
import { AuthRoute } from "./components/AuthRoute/AuthRoute";
import { PrivateNavbar } from "./components/Navbar/PrivateNavbar";
import { PublicNavbar } from "./components/Navbar/PublicNavbar";
import { Pricing } from "./components/Pricing/Pricing";
import { Dashboard } from "./components/Users/Dashboard";
import { Login } from "./components/Users/Login";
import { Register } from "./components/Users/Register";

const Home = () => <h1>Home Page</h1>;

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <BrowserRouter>
        {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
