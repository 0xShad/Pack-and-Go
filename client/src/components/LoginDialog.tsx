import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/auth.context";

const LoginDialog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const { setToken, setIsAuthenticated } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/auth/sign-in", {
        email,
        password,
      });

      if (res.data.success && res.data.data.token) {
        toast.success("Logged in successfully.");
        const token = res.data.data.token;

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("authToken", token);

        setToken(token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer bg-black text-white rounded-md">
        Login
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login to your account</DialogTitle>
        </DialogHeader>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
        />
      </DialogContent>
    </Dialog>
  );
};
export default LoginDialog;
