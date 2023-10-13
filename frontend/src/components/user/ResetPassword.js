import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearAuthError } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.authState);
  const darkMode = useSelector((state) => state.darkmode);
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast("Password Reset Success!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      navigate("/");
      return;
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
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <div
      className={`flex justify-center items-center h-screen ${
        darkMode
          ? "bg-black"
          : "bg-gray-400"
      } min-h-screen px-4 text-pale-blue font-montserrat`}
    >
      <div
        className={`w-full max-w-md px-4 py-2 ${
          darkMode
            ? "bg-gradient-to-bl from-blue-950 to-cyan-700 via-stone-800"
            : "bg-gradient-to-tl from-gray-900 to-gray-700 via-gray-600"
        } rounded-lg`}
      >
        <h1 className="mb-3 text-2xl font-semibold text-center">
          New Password
        </h1>

        <form
          className="w-full max-w-md px-4 py-2 space-y-4"
          onSubmit={submitHandler}
        >
          <div>
            <label htmlFor="password_field" className="block mb-1 font-medium">
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

          <div>
            <label
              htmlFor="confirm_password_field"
              className="block mb-1 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password_field"
              className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className={`w-full mb-3 py-3 ${
              darkMode
                ? "bg-gradient-to-tl from-stone-900 to-yellow-600 via-indigo-950"
                : "bg-gradient-to-tl from-stone-900 to-blue-600 via-indigo-950"
            } text-white font-bold rounded hover:to-stone-400 focus:outline-none`}
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}
