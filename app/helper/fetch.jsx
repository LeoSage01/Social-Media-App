import { notFound } from "next/navigation";

const port = process.env.API_BASE_URL;

export async function fetchApi() {
  const res = await fetch(`${port}/posts`);

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const posts = await res.json();

 posts?.map((post) => ({
    id: post.username.toString(),
  }));

  return id;
}
