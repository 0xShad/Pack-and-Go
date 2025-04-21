import { LoginForm } from "@/components/login-form"
import { SignUpForm } from "@/components/signup-form"
import { useState } from "react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false)


  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {isLogin ? (<LoginForm onSwitch={() => setIsLogin(false)}/>) : <SignUpForm onSwitch={() => setIsLogin(true)}/>}
      </div>
    </div>
  )
}
