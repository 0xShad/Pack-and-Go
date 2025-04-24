import { LoginForm } from "@/components/login-form";
import { SignUpForm } from "@/components/signup-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        const token = res.data.token;
        const expiryTime = new Date().getTime() + 5 * 60 * 60 * 1000; // 5 hours in milliseconds

        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiry", expiryTime.toString());

        toast.success("User logged in successfully.");
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating user.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/auth/sign-in", {
        email,
        password,
      });

      if (res.data.success) {
        const token = res.data.token;
        const expiryTime = new Date().getTime() + 5 * 60 * 60 * 1000; // 5 hours in milliseconds

        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiry", expiryTime.toString());

        toast.success("User logged in successfully.");
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging in the user.");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {isLogin ? (
          <LoginForm
            onSwitch={() => setIsLogin(false)}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleLogin}
          />
        ) : (
          <SignUpForm
            onSwitch={() => setIsLogin(true)}
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
        )}
      </div>
    </div>
  );
}
