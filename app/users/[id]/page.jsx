import { notFound } from "next/navigation";
import axios from "axios";

import styles from "../../styles/post.module.css";

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const users = await res.json();

  return users.map((users) => ({
    id: users.id,
  }));
}

async function getUser(id) {
  // initiate delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function page({ params }) {
  const user = await getUser(params.id);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center overflow-y-scroll px-4">
        <div className="text-center pt-10 pb-6 fixed top-0 left-0 w-full bg-white shadow-md z-10">
          <h3 className="text-xl text-purple-700 font-bold mb-4">
            {user.username}
          </h3>
        </div>
        <div className="mb-32"></div>

        <div className={styles.glass}>
          <p className="break-normal md:break-words">
            {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            distinctio nobis voluptatum deleniti enim hic dolor, aliquid ea esse
            architecto non illum, eveniet delectus maxime nihil inventore
            temporibus ad ipsum. */}
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
