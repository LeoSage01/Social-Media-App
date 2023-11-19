import { notFound } from "next/navigation";
import styles from "../../styles/post.module.css";

export const dynamicParams = true;

const API_BASE_URL = "https://assignment-api-spxd.onrender.com/api";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`);
    if (!res.ok) {
      throw new Error(`Failed to fetch posts. Status: ${res.status}`);
    }

    const posts = await res.json();

    return posts.map((post) => ({
      id: post.username,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { notFound: true };
  }
}

async function getPost(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch post ${id}. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return { notFound: true };
  }
}

export default async function page({ params }) {
  try {
    const post = await getPost(params.id);

    if (post.notFound) {
      // Handle not found case, e.g., redirect to a 404 page
      return { notFound: true };
    }

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
            <p className="break-normal md:break-words">{post.username}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering page:", error);
    return { notFound: true };
  }
}
