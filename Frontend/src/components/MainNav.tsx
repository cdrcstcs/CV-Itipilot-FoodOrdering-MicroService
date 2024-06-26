import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <span className="flex space-x-2 items-center">
        <>
          <Link to="/order-status" className="font-bold hover:text-blue-500">
            Order Status
          </Link>
          <UsernameMenu />
        </>
    </span>
  );
};

export default MainNav;
