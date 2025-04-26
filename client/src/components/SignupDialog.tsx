import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignUpForm } from "./signup-form";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/auth.context";

const SignupDialog = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/auth/sign-up", {
        username,
        firstName,
        lastName,
        email,
        password,
      });

      if (res.data.success) {
        toast.success("User created successfully.");
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating user.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer border-2 rounded-md hover:bg-stone-200">Sign up</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an account.</DialogTitle>
        </DialogHeader>
        <SignUpForm
          username={username}
          setUsername={setUsername}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSignUp}
        />
      </DialogContent>
    </Dialog>
  );
};
export default SignupDialog;
