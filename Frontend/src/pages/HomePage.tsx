import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import img from "../assets/home.png";
const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="mt-2 md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center ">
        <SearchBar
          placeHolder="Search Food by City or Town"
          onSubmit={handleSearchSubmit}
        />
      <img className="w-full h-96 rounded-2xl" src={img} alt="home"></img>
      </div>
    </div>
  );
};
export default HomePage;
