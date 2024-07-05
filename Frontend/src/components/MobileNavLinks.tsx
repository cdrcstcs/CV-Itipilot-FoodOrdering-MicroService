import { Link } from "react-router-dom";

const MobileNavLinks = () => {
  return (
    <>
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-blue-500"
      >
        Order Status
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-blue-500"
      >
        My Restaurant
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-blue-500"
      >
        User Profile
      </Link>
    </>
  );
};

export default MobileNavLinks;
