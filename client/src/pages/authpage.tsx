import { LoginForm } from "@/components/login-form"
import { SignUpForm } from "@/components/signup-form"
import { useState } from "react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSignUp = async(e: React.FormEvent) => {
    e.preventDefault()

  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {isLogin ? 
        (<LoginForm
           onSwitch={() => setIsLogin(false)}
           
        />) 

        : <SignUpForm 
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
        />}
      </div>
    </div>
  )
}
