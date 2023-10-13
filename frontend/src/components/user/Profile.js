import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);
  const darkMode = useSelector((state) => state.darkmode);
  return (
    <div
      className={`${
        darkMode ? "bg-black" : "bg-gray-400"
      } font-montserrat text-pale-blue min-h-screen px-4 py-2`}
    >
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-8">
        <div className="md:w-1/2 mt-5">
          <img
            className="rounded-lg mx-auto w-1/2 md:w-2/3 lg:w-1/3"
            src={user.avatar ?? "/images/default_avatar.png"}
            alt="Profile"
          />
        </div>

        <div className="md:w-1/2 mt-5 max-sm:px-16">
          <h1 className="text-2xl font-bold mb-2">
            <span className="text-coral-red">User</span> Details
          </h1>
          <h4 className="font-bold">Full Name:</h4>
          <span className={`text-${darkMode ? "pale-blue" : "stone-900"}`}>
            {user.name}
          </span>

          <h4 className="font-bold mt-4">Email Address:</h4>
          <span className={`text-${darkMode ? "pale-blue" : "stone-900"}`}>
            {user.email}
          </span>

          <h4 className="font-bold mt-4">Joined:</h4>
          <p className="text-coral-red font-semibold">
            {String(user.createdAt).substring(0, 10)}
          </p>

          <Link
            to="/myprofile/update"
            id="edit_profile"
            className="bg-gradient-to-tl from-yellow-500 to-yellow-700 via-blue-950 text-white hover:to-orange-500 px-4 py-2 rounded block mt-3 text-center font-bold hover:no-underline w-52"
          >
            Edit Profile
          </Link>

          <Link
            to="/orders"
            className="bg-gradient-to-bl from-red-500 to-red-800 via-indigo-950 hover:to-orange-500 text-white py-2 px-3 md:px-4 rounded block mt-3 text-center font-bold hover:no-underline w-52"
          >
            My Orders
          </Link>

          <Link
            to="/myprofile/update/password"
            className="bg-gradient-to-tl from-amber-900 to-gray-400 via-indigo-950 hover:to-orange-500 text-white py-2 px-4 rounded block mt-3 text-center font-bold hover:no-underline w-52"
          >
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}
