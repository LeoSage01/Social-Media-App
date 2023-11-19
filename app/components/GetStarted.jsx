import Link from "next/link";
import Image from "next/image";
import Saly from "../../public/Saly-14.png";
import styles from "../styles/form.module.css";

const GetStarted = () => {
  return (
    <div className="container mx-auto pt-4">
      <div className="flex flex-col justify-center my-auto items-center">
        <Image
          src={Saly}
          className="h-[400px] w-[250px]"
          alt="User image, Saly"
        />
        <h2 className="text-2xl font-bold mt-4 mb-2 text-center">Explore your creativity</h2>
        <p className="text-center">A tool to explore and share moments with friends</p>
        <Link className={`${styles.btn} mt-14 sm:mt-8`} href="/login">
          Get Stared
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
