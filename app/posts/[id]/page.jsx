"use client"
import { useParams } from 'next/navigation'
import { notFound } from "next/navigation";
import styles from "../../styles/post.module.css";

export async function getPost(id) {
  const res = await fetch(`https://assignment-api-spxd.onrender.com/api/posts/${id}`);

  if (!res.ok) {
     return {
      notFound: true,
    };
  }

  return await res.json();
}

export default async function page() {
  const params = useParams()
  const post = await getPost(params.id);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center overflow-y-scroll px-4">
        <div className="text-center pt-10 pb-6 fixed top-0 left-0 w-full bg-white shadow-md z-10">
          <h3 className="text-xl text-purple-700 font-bold mb-4">
            {post.title}
          </h3>
        </div>
        <div className="mb-32"></div>

        <div className={styles.glass}>
          <p className="break-normal md:break-words">{post.description}</p>
        </div>
      </div>
    </div>
  );
} 

 
