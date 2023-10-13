import MetaData from "./layouts/MetaData";
import { useSelector } from "react-redux";
import Banner from "./Banner/Banner";
import BannerBottom from "./Banner/BannerBottom";
import Sale from "./sale/Sale";
import NewArrivals from "./newArrivals/NewArrivals";
import YearProduct from "./yearProduct/YearProduct";
import SpecialOffers from "./specialOffers/SpecialOffers";
import Contact from "./layouts/Contact";

export default function Home() {
  const darkMode = useSelector((state) => state.darkmode);

  return (
    <div
      className={`${darkMode ? "bg-black" : "bg-gray-400"} overflow-hidden `}
    >
      <MetaData title={"Buy Best Products"} />
      <Banner />
      <BannerBottom />
      <Sale />
      <NewArrivals />
      <YearProduct />
      <SpecialOffers />
      <Contact />
    </div>
  );
}
