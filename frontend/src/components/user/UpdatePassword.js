import { useEffect, useState } from "react";
import {
  updatePassword as updatePasswordAction,
  clearAuthError,
} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((state) => state.authState);
  const {loading} = useSelector((state)=>state.cartState)
  const darkMode = useSelector((state) => state.darkmode);

  const submitHandler = (e) => {
    e.preventDefault();
    if(!oldPassword.trim() || !password.trim()){
      toast("Please enter both old and new password",{
        type:"error",
        position:toast.POSITION.BOTTOM_CENTER
      })
      return
    }
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("password", password);
    dispatch(updatePasswordAction(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      toast("Password updated successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setOldPassword("");
      setPassword("");
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
  }, [isUpdated, error, dispatch]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gray-400"
      } font-montserrat text-pale-blue px-4 `}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div
          className={`w-full max-w-md px-4 py-2 ${
            darkMode
              ? "bg-gradient-to-bl from-blue-950 to-cyan-700 via-stone-800"
              : "bg-gradient-to-tl from-gray-900 to-gray-700 via-gray-600"
          } rounded-lg mb-2`}
        >
          <form
            className="w-full max-w-md px-4 py-2 space-y-4"
            onSubmit={submitHandler}
          >
            <h1 className="mb-3 text-3xl font-bold text-center">
              Update Password
            </h1>
            <div>
              <label
                htmlFor="old_password_field"
                className="block mb-1 font-medium"
              >
                Old Password
              </label>
              <input
                type="password"
                id="old_password_field"
                className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="new_password_field"
                className="block mb-1 font-medium"
              >
                New Password
              </label>
              <input
                type="password"
                id="new_password_field"
                className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={`w-full mb-3 py-3 ${
                darkMode
                  ? "bg-gradient-to-bl from-stone-950 to-yellow-500 via-stone-900"
                  : "bg-gradient-to-tl from-cyan-700 to-yellow-500 via-stone-900"
              } text-white font-bold rounded hover:to-orange-500 focus:outline-none`}
              disabled={loading}
            >
              {loading? "Password Updating...":"Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
