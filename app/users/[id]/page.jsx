import { notFound } from "next/navigation"
import axios from 'axios';

import styles from "../styles/post.module.css";

export  const dynamicParams = true

export async function generateStaticParams() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  const users = response.data;

  return users.map((user) => ({
    id: user.id
  }));
}

async function getPost(id) {
  // initiate delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`, {
      
    });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      // Handle 404 error
      notFound();
    } else {
      // Handle other errors
      console.error('Error fetching user:', error.message);
    }
  }
}



export default async function page({ params: { id } }) {
  const post = await getPost(params.id)

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center overflow-y-scroll px-4">
        <div className="text-center pt-10 pb-6 fixed top-0 left-0 w-full bg-white shadow-md z-10">
          <h3 className="text-xl text-purple-700 font-bold mb-4">
            {post.username}
          </h3>
        </div>
        <div className="mb-32"></div>

        <div className={styles.glass}>
          <p className="break-normal md:break-words">
            {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            distinctio nobis voluptatum deleniti enim hic dolor, aliquid ea esse
            architecto non illum, eveniet delectus maxime nihil inventore
            temporibus ad ipsum. */}
            {post.email}
          </p>
        </div>
      </div>
    </div>
  );
}
