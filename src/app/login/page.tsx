"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const router =  useRouter()

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)


  const onLogin = async () => {
    try {

      setLoading(true)

      const response = await axios.post("/api/users/login", user)

      console.log(response);

      toast.success("Login success")

      router.push("/profile")
      
      
    } catch (error  : any) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  };

  useEffect(() =>  {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Login"}</h1>

      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none  focus:border-gray-600 "
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none  focus:border-gray-600 "
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button onClick={onLogin}  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 cursor-pointer">{buttonDisabled ? "No Login" : "Login"}</button>
      <Link href="/signup">Visit Signup</Link>
    </div>
  );
}
