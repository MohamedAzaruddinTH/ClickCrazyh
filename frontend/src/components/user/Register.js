import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const darkMode = useSelector((state) => state.darkmode);

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [error, isAuthenticated, dispatch, navigate]);

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
            onSubmit={submitHandler}
            className="w-full max-w-md px-4 py-2 space-y-4"
            encType="multipart/form-data"
          >
            <h1 className="mb-3 text-3xl font-bold text-center">Register</h1>

            <div>
              <label htmlFor="name_field" className="block mb-1 font-medium">
                Name
              </label>
              <input
                name="name"
                onChange={onChange}
                type="name"
                id="name_field"
                className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
              />
            </div>

            <div>
              <label htmlFor="email_field" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                name="email"
                onChange={onChange}
                className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
              />
            </div>

            <div>
              <label
                htmlFor="password_field"
                className="block mb-1 font-medium"
              >
                Password
              </label>
              <input
                name="password"
                onChange={onChange}
                type="password"
                id="password_field"
                className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
              />
            </div>

            <div className="flex items-center">
              <div className="w-16 h-14 mr-3">
                <figure className="avatar">
                  <img
                    src={avatarPreview}
                    className="rounded-lg w-28 h-12 "
                    alt="Avatar"
                  />
                </figure>
              </div>
              <div className="w-full flex flex-col">
                <div className="flex justify-start">
                  <label htmlFor="avatar_upload" className="block font-medium">
                    Avatar
                  </label>
                </div>
                <div className="relative flex-1">
                  <input
                    type="file"
                    name="avatar"
                    onChange={onChange}
                    className="hidden"
                    id="customFile"
                  />
                  <div className="flex justify-start">
                    <label
                      className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg text-center cursor-pointer"
                      htmlFor="customFile"
                    >
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              id="register_button"
              type="submit"
              className={`w-full mb-3 py-3 ${
                darkMode
                  ? "bg-gradient-to-tl from-stone-900 to-yellow-600 via-indigo-950"
                  : "bg-gradient-to-tl from-stone-900 to-blue-600 via-indigo-950"
              } text-white font-bold rounded hover:to-stone-400 hover:scale-105 duration-300 focus:outline-none `}
              disabled={loading}
            >
              {loading ? "Registering..." : "REGISTER"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
