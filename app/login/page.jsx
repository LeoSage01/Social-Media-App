"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

import styles from "../styles/form.module.css";

const page = () => {
  const URL = process.env.API_BASE_URL;
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!username) {
        toast.error("Email is required!");
        return;
      } else if (username.includes(" ")) {
        toast.error("Invalid email format!");
        return;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)) {
        toast.error("Invalid email address!");
        return;
      }
  
      if (!password) {
        toast.error("Password is required!");
        return;
      } else if (password.includes(" ")) {
        toast.error("Invalid password format!");
        return;
      } else if (password.length < 4) {
        toast.error("Password must be at least 4 characters long!");
        return;
      }
  
      toast.loading("Logging in..."); 
      const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (res.status === 200) {
        toast.success('Login Successful');
        router.push("/posts");
      } else {
        console.error("Login failed", res);
        toast.error('Login failed');
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error('Login failed');
    }
  };
  
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{ width: "50%", paddingTop: "2em" }}
        >
          <div className="title flex flex-col items-center mb-10">
            <h4 className="text-2xl font-bold">Hello Again!</h4>
            <span className="py-4  w-2/3 text-center text-gray-500">
              Welcome back to our App
            </span>
          </div>

          <form className="py-1">
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                placeholder="johndoe@gmail.com*"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={styles.textbox}
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={`${styles.btn} mt-8`}
                type="submit"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>

            <div className="text-center py-4 text-sm">
              <span className="text-gray-500">
                Don't have an account?{" "}
                <Link className="text-red-500" href="/register">
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
