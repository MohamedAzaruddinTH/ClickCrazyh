import { useSelector } from "react-redux";

export default function Loader() {
  const darkMode = useSelector((state)=>state.darkmode)
    return (
      <div className={`${
        darkMode
          ? "bg-black"
          : "bg-gray-400"
      } font-montserrat text-pale-blue flex items-center justify-center h-screen `}>
        <div className="animate-spin rounded-full border-spacing-10 border-t-8 border-yellow-500 h-32 w-32"></div>
      </div>
    );
  }
  