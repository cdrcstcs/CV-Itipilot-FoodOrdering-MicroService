import { Link } from "react-router-dom";
const UsernameMenu = () => {
  return (
      <Link
        to="/manage-restaurant"
        className="font-bold hover:text-orange-500"
      >
        Manage Restaurant
      </Link>
  );
};

export default UsernameMenu;
