import Link from "next/link";
import Image from "next/image";
import Saly from "../../public/Saly-14.png";
import styles from "../styles/form.module.css";

const GetStarted = () => {
  return (
    <div className="container mx-auto h-screen">
      <div className="flex justify-center my-auto items-center">
        <Image
          src={Saly}
          height={100}
          width={100}
          alt="User image, Saly "
        />
        <h2 className="text-2l font-bold mt-6 mb-2 text-center">Explire your creativity</h2>
        <p className="text-center">Lorem ipsum, dolor sit amet consectetur</p>
        <Link className={`${styles.btn} mt-8`} href="/login">
          Get Stared
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
