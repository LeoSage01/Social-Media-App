"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import convertToBase64 from "../helper/convert";
import imgg from "../../public/imag.png";

import styles from "../styles/post.module.css";

export default function test() {
  function onUpload() {}

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center overflow-y-scroll px-4">
        <div className="text-center pt-10 pb-6 fixed top-0 left-0 w-full bg-white shadow-md z-10">
          <h3 className="text-xl text-purple-700 font-bold mb-4">
            Samson Oppenhiemer
          </h3>
        </div>
        <div className="mb-36"></div>
        
        <div className={styles.glass}>
          <p className="break-normal md:break-words">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            distinctio nobis voluptatum deleniti enim hic dolor, aliquid ea esse
            architecto non illum, eveniet delectus maxime nihil inventore
            temporibus ad ipsum.
          </p>
        </div>
        
      </div>
    </div>
  );
}
