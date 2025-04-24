import { Search, CircleUserRound } from "lucide-react";
import { Separator } from "./ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <nav className="w-full flex justify-around p-4 items-center">
        <div className="">
          <img
            src="/assets/logo.jpg"
            alt="logo"
            className="h-15 w-full cursor-pointer"
          />
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-10">
            <li className="text-gray-400 text-md hover:text-black cursor-pointer">Home</li>
            <li className="text-gray-400 text-md hover:text-black cursor-pointer">About</li>
            <li className="text-gray-400 text-md hover:text-black cursor-pointer">Services</li>
            <li className="text-gray-400 text-md hover:text-black cursor-pointer">Contact</li>
          </ul>
        </div>
        <div className="flex gap-10">
          <HoverCard openDelay={200} closeDelay={200}>
            <HoverCardTrigger>
            <Search className="text-gray-400 hover:text-black cursor-pointer"/>
            </HoverCardTrigger>
            <HoverCardContent>
              <div>
                <Input type="text" placeholder="Search"/>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard openDelay={200} closeDelay={200}>
            <HoverCardTrigger>
            <CircleUserRound className="text-gray-400 hover:text-black cursor-pointer"/>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex gap-3 flex-col p-2">
                <Button className="cursor-pointer">Log in</Button>
                <Button className="cursor-pointer bg-white text-black border-2 hover:bg-black hover:text-white">Sign up</Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </nav>
      <Separator/>
    </>
  );
};
export default Navbar;
