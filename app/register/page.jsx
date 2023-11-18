"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { registerValidation } from "../helper/validate";

import styles from "../styles/form.module.css";

const page = ({params}) => {
  const API_BASE_URL = "https://assignment-api-spxd.onrender.com/api";
  
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        username,
        password,
      });

      // Handle success, maybe store the token securely, and redirect to the posts page
      router.push("/posts");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
          <div
            className={styles.glass}
            style={{ width: "45%", paddingTop: "3em" }}
          >
            <div className="title flex flex-col items-center mb-10">
              <h4 className="text-2xl font-bold">Hello User!</h4>
              <span className="py-4  w-2/3 text-center text-gray-500">
                Welcome to our App
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
                  type="text"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.btn} type="submit"  onClick={handleRegister}>
                  Register
                </button>
              </div>

              <div className="text-center py-4 text-sm">
                <span className="text-gray-500">
                  Already have an account?{" "}
                  <Link className="text-red-500" href="/login">
                    Login Now
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
