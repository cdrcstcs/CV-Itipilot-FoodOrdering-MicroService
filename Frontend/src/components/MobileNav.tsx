import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-blue-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-blue-500" />
            </span>
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
            <MobileNavLinks />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
