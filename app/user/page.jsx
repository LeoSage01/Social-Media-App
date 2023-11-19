import Link from "next/link";

import styles from "../styles/post.module.css";

async function fetchPosts() {
  const res = await fetch("https://assignment-api-spxd.onrender.com/api/posts", {
    next: {
      revalidate: 0,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

  return res.json();
}

const page = async () => {
  const posts = await fetchPosts();

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center overflow-y-scroll px-4">
        <div className="text-center pt-10 pb-6 fixed top-0 left-0 w-full bg-white shadow-md z-10">
          <h3 className="text-xl text-purple-700 font-bold mb-4">All Posts</h3>
        </div>
        <div className="mb-32"></div>

        {posts.map((post) => (
          <div key={post.id} className={styles.glass}>
            <Link href={`/post/${post.id}`}>
              <p className="break-normal md:break-words">{post.body}</p>

              <p className="mt-4">
                Post by <span className="text-purple-700">{post.name}</span>
              </p>
            </Link>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-center">There are no posts yet!</p>
        )}
      </div>

      <Link href="./create">
        <div className="fixed bottom-0 left-0 w-full z-10 pb-10">
          <div className=" border bg-purple-700 w-[200px] py-2 mx-auto rounded-lg text-gray-50 shadow-sm text-center">
            Create new post
          </div>
        </div>
      </Link>
    </div>
  );
};

export default page;
