import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearAuthError } from "../../actions/userActions";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.authState);
  const darkMode = useSelector((state) => state.darkmode);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast(message, {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setEmail("");
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
  }, [message, error, dispatch]);

  return (
    <div
      className={`flex justify-center items-center h-screen ${
        darkMode ? "bg-black" : "bg-gray-400"
      } min-h-screen px-4 text-pale-blue font-montserrat`}
    >
      <div
        className={`w-full max-w-md px-4 py-2 ${
          darkMode
            ? "bg-gradient-to-bl from-blue-950 to-cyan-700 via-stone-800"
            : "bg-gradient-to-tl from-gray-900 to-gray-700 via-gray-600"
        } rounded-lg `}
      >
        <h1 className="text-3xl font-bold mb-3 text-center">Forgot Password</h1>
        <div className="mb-4">
          <label htmlFor="email_field" className="block mb-1 font-medium">
            Enter Email
          </label>
          <input
            type="email"
            id="email_field"
            className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            id="forgot_password_button"
            type="submit"
            className={`w-52 py-3 ${darkMode?"bg-gradient-to-tl from-orange-900 to-rose-950 via-stone-900 ":"bg-gradient-to-bl from-red-800 to-rose-900 via-coral-red "}text-white font-bold rounded hover:to-pale-blue hover:scale-105 duration-300`}
            onClick={submitHandler}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
