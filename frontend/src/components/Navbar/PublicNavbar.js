import { Link } from "react-router-dom";

export const PublicNavbar = () => {
  return (
    <div className="container mx-auto fixed z-40 top-5 left-1/2 -translate-x-1/2  bg-[#FFE9D1] dark:bg-[#14181c] rounded-lg shadow-2xl">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            GenGPT
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex gap-2">
          <Link to="/register" className="btn btn-accent text-white rounded-lg">
            Sign up
          </Link>
          <Link to="/login" className="btn btn-primary text-white rounded-lg">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
