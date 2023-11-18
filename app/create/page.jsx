"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import convertToBase64 from "../helper/convert";
import pic from "../../public/imag.png";

import styles from "../styles/form.module.css";

const page = () => {
  const API_BASE_URL = "https://assignment-api-spxd.onrender.com/api";

  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const post = {
      username,
      body,
      file,
    };

    if(post.file === ""){
      const res = await fetch(`${API_BASE_URL}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
    } else {
      const res = await fetch(`${API_BASE_URL}/createpost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

    }

    if (res.status === 201) {
        router.refresh()
        router.push('/posts')
    }
  
  };

  

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center mb-10">
            <h4 className="text-2xl font-bold">Hello Again!</h4>
            <span className="py-4  w-2/3 text-center text-gray-500">
              Welcome back to our App
            </span>
          </div>

          <form className="py-1">
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <Image
                  src={pic}
                  className={`${styles.profile_img}`}
                  alt="Picture of image icon"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                placeholder="johndoe@gmail.com*"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <textarea
                className={styles.textbox}
                placeholder="Add a post..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                cols="30"
                rows="5"
              ></textarea>
              <button
                className={styles.btn}
                type="submit"
                onClick={handleLogin}
              >
                {isLoading && <span>Posting...</span>}
                {!isLoading && <span>Post</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
