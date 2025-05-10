import { useEffect, useState } from "react";
import {
  PhilippinePeso,
  DollarSign,
  JapaneseYen,
  IndianRupee,
  CircleUserRound,
  Menu,
  X,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import LoginDialog from "./LoginDialog";
import SignupDialog from "./SignupDialog";
import { useAuth } from "@/context/auth.context";
import { toast } from "sonner";
import CreateTourDialog from "./CreateTourDialog";

const Navbar = () => {
  const [navState, setNavState] = useState("Home");
  const [preparedCurrency, setPreparedCurrency] = useState("PHP");
  const currency: string[] = ["PHP", "USD", "YEN", "INR"];
  const { isAuthenticated, setIsAuthenticated, setToken } = useAuth();
  const [open, setOpen] = useState(false);

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
                } cursor-pointer hover:text-black`}
                onClick={() => setNavState(link)}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
        <div className="md:hidden">
          <Menu
            className="text-gray-400 hover:text-black cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="gap-10 hidden md:flex">
          <HoverCard openDelay={200} closeDelay={200}>
            <HoverCardTrigger>
              <div className="text-gray-400 hover:text-black cursor-pointer hidden md:block">
                {currencyIcons[preparedCurrency]}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-[6rem]">
              <div className="flex flex-col gap-5">
                {currency.map((key) => (
                  <div
                    key={key}
                    className="flex items-center cursor-pointer hover:bg-stone-200 px-1 rounded-sm"
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
              <CircleUserRound className="text-gray-400 hover:text-black cursor-pointer hidden md:block" />
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex gap-3 flex-col p-2">
                {isAuthenticated ? (
                  <>
                    <CreateTourDialog />
                    <Button
                      className="cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("isAuthenticated"); // Remove from localStorage on logout
                        localStorage.removeItem("authToken"); // Remove token from localStorage on logout
                        setIsAuthenticated(false); // Set state to false
                        setToken(null); // Clear token in context
                        toast.success("Logged out successfully.");
                      }}
                    >
                      Logout
                    </Button>
                  </>
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

        { open && (
          <div className="absolute z-20 bg-white shadow-lg rounded-md px-45 py-10 w-full top-0 h-[80vh]">
            {/*close button*/}
            <X className="cursor-pointer absolute right-10" onClick={() => setOpen(!open)}/>
            <div className="flex flex-col gap-10 p-10">
              {navLinks.map((link) => (
                <button
                  key={link}
                  className={`text-lg ${
                    link === navState ? "text-black" : "text-gray-400"
                  } cursor-pointer hover:text-black`}
                  onClick={() => {
                    setNavState(link);
                    setOpen(false);
                  }}
                >
                  {link}
                </button>
              ))}
              {isAuthenticated ? (
                  <>
                    <CreateTourDialog />
                    <Button
                      className="cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("isAuthenticated"); // Remove from localStorage on logout
                        localStorage.removeItem("authToken"); // Remove token from localStorage on logout
                        setIsAuthenticated(false); // Set state to false
                        setToken(null); // Clear token in context
                        toast.success("Logged out successfully.");
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <LoginDialog />
                    <SignupDialog />
                  </>
                )}
            </div>
          </div>
        )}
      </nav>
      <Separator />
    </>
  );
};

export default Navbar;
