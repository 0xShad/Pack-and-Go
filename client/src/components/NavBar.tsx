import { useEffect, useState } from "react";
import {
  PhilippinePeso,
  DollarSign,
  JapaneseYen,
  IndianRupee,
  CircleUserRound,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import LoginDialog from "./LoginDialog";
import SignupDialog from "./SignupDialog";
import { useAuth } from "@/context/auth.context";
import { toast } from "sonner";

const Navbar = () => {
  const [navState, setNavState] = useState("Home");
  const [preparedCurrency, setPreparedCurrency] = useState("PHP");
  const currency: string[] = ["PHP", "USD", "YEN", "INR"];
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const currencyIcons: Record<string, React.ReactNode> = {
    PHP: <PhilippinePeso className="w-7 h-5 inline mr-2" />,
    USD: <DollarSign className="w-4 h-4 inline mr-2" />,
    YEN: <JapaneseYen className="w-4 h-4 inline mr-2" />,
    INR: <IndianRupee className="w-4 h-4 inline mr-2" />,
  };

  const navLinks = ["Home", "Tours", "About", "Contact"];

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated]);

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
          <div className="flex gap-10">
            {navLinks.map((link) => (
              <button
                key={link}
                className={`${
                  link === navState ? "text-black" : "text-gray-400"
                } cursor-pointer`}
                onClick={() => setNavState(link)}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-10">
          <HoverCard openDelay={200} closeDelay={200}>
            <HoverCardTrigger>
              <div className="text-gray-400 hover:text-black cursor-pointer">
                {currencyIcons[preparedCurrency]}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-[6rem]">
              <div className="flex flex-col gap-5">
                {currency.map((key) => (
                  <div
                    key={key}
                    className="flex items-center cursor-pointer"
                    onClick={() => setPreparedCurrency(key)}
                  >
                    {currencyIcons[key]}
                    {key}
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard openDelay={200} closeDelay={200}>
            <HoverCardTrigger>
              <CircleUserRound className="text-gray-400 hover:text-black cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex gap-3 flex-col p-2">
                {isAuthenticated ? (
                  <Button
                    onClick={() => {
                      localStorage.removeItem("isAuthenticated"); // Remove from localStorage on logout
                      setIsAuthenticated(false); // Set state to false
                      toast.success("Logged out successfully.")
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <LoginDialog />
                    <SignupDialog />
                  </>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </nav>
      <Separator />
    </>
  );
};

export default Navbar;
