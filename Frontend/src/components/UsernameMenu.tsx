import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
// import { Avatar } from "./Avatar";
// import { useGetMyUser } from "@/api/MyUserApi";
// import LoadingButton from "./LoadingButton";
const UsernameMenu = () => {
  // const { currentUser, isLoading } = useGetMyUser();
  // if (isLoading) {
  //   return <LoadingButton></LoadingButton>;
  // }
  // if (!currentUser) {
  //   return <LoadingButton></LoadingButton>;
  // }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-blue-500 gap-2">
        {/* <Avatar imageId={currentUser?.imageId}></Avatar> */}
        <CircleUserRound className="text-blue-500" />
        {/* {currentUser?.name} */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold hover:text-blue-500"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <Separator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UsernameMenu;
