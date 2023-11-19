import { notFound } from "next/navigation";

import styles from "../../styles/post.module.css";

export const dynamicParams = true;

export async function generateStaticParams() {
  const API_BASE_URL = "https://assignment-api-spxd.onrender.com/api";

  const res = await fetch(`${API_BASE_URL}/posts`)
  const posts = await res.json();

  return posts.map((post) => ({
    id: post.username,
  }));
}

async function getPost(id) {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function page({ params }) {
  const post = await getPost(params.id);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center overflow-y-scroll px-4">
        <div className="text-center pt-10 pb-6 fixed top-0 left-0 w-full bg-white shadow-md z-10">
          <h3 className="text-xl text-purple-700 font-bold mb-4">
            {post.body}
          </h3>
        </div>
        <div className="mb-32"></div>

        <div className={styles.glass}>
          <p className="break-normal md:break-words">
            {post.username}
          </p>
        </div>
      </div>
    </div>
  );
}
