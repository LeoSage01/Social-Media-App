"use client";

import { useState } from "react";
import Image from "next/image";
import 'dotenv/config'
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import convertToBase64 from "../helper/convert";
import pic from "../../public/imag.png";
import pic2 from "../../public/image-back.png";

import styles from "../styles/form.module.css";

const page = () => {
  const URL = process.env.API_BASE_URL;
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setIsSelected(true);
    toast.success("Image selected");
    setFile(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username) {
      toast.error("Email Required...!");
      setIsLoading(false);
      return;
    } else if (username.includes(" ")) {
      toast.error("Invalid email...!");
      setIsLoading(false);
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)) {
      toast.error("Invalid email address...!");
      setIsLoading(false);
      return;
    }

    const post = {
      username,
      body,
      file,
    };

    try {
      let res;
      if (isSelected) {
        res = await fetch(`${URL}/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        });
      } else {
        res = await fetch(`${URL}/createpost`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        });
      }

      if (res.status === 201 || res.status === 200) {
        setIsLoading(false);
        setIsSelected(false);
        toast.success("Post Successful!");

        router.refresh();
        router.push("/posts");
      } else {
        toast.error("Failed to post. Please try again.");
      }
    } catch (error) {
      console.error("Error posting:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

       <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} mx-4 my-auto`}
          style={{ width: "50%", paddingTop: "1em" }}
        >
          <div className="title flex flex-col items-center mb-2">
            <h4 className="text-2xl font-bold">What's happening?</h4>
            <span className="py-2 w-2/3 text-center text-gray-500">
              Make a post
            </span>
          </div>

          <form className="py-1">
            {isSelected ? (
              <div className="profile flex justify-center py-2">
                <label htmlFor="profile">
                  <Image
                    src={pic}
                    className={`${styles.profile_img} h-[150px] w-[150px]`}
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
            ) : (
              <div className="profile flex justify-center py-2">
                <label htmlFor="profile">
                  <Image
                    src={pic2}
                    className={`${styles.profile_img} h-[150px] w-[150px]`}
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
            )}
            <div className="textbox flex flex-col mt-2 items-center gap-4">
              <input
                className={styles.textbox}
                type="text"
                placeholder="johndoe@gmail.com*"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <textarea
                className={styles.textbox}
                placeholder="Add a comment..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                cols="30"
                rows="4"
              ></textarea>
              <button
                className={styles.btn}
                type="submit"
                onClick={handleSubmit}
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
