import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const darkMode = useSelector((state) => state.darkmode);

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate, redirect]);

  return (
    <div
      className={`${
        darkMode ? "bg-black" : "bg-gray-400"
      } text-pale-blue font-montserrat min-h-screen`}
    >
      <MetaData title={`Login`} />
      <div className="flex justify-center items-center h-screen px-4">
        <div
          className={`w-full max-w-md px-4 py-2 ${
            darkMode
              ? "bg-gradient-to-bl from-blue-950 to-cyan-700 via-stone-800"
              : "bg-gradient-to-bl from-gray-900 to-gray-700 via-gray-600"
          } rounded-lg`}
        >
          <h1 className="mb-3 text-3xl font-bold text-center">Login</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="email_field" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password_field"
                className="block mb-1 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/password/forgot"
                className={`block mb-2 text-red-500 font-semibold hover:no-underline`}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              id="login_button"
              type="submit"
              className={`w-full py-3 ${
                darkMode
                  ? "bg-gradient-to-bl from-gray-400 to-indigo-700 via-stone-950"
                  : "bg-gradient-to-tl from-gray-400 to-purple-950 via-stone-950"
              } font-semibold rounded hover:to-cyan-400 hover:scale-105 duration-300 mt-2 mb-3 focus:outline-none`}
              disabled={loading}
            >
              {loading ? "Logging..." : "LOGIN"}
            </button>

            <div className="flex justify-center">
              <Link
                to="/register"
                className="font-semibold hover:no-underline"
              >
                New User?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
