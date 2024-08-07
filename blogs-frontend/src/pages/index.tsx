import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Card from "@/components/Card";
import { useAppContext } from "@/store";
import { useState } from "react";
import Header from "@/components/Header";
import { Blog } from "@/types/blog";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  try {
    const blogs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
    const data = await blogs.json();
    return {
      props: { data },
    };
  }
  catch (e) {
    console.error(e);
    return {
      props: { data: [] },
    };
  }
}



export default function Home({ data }: { data: Blog[] }) {

  return (
    <div className={styles.wrapper}>
      <Header title="Blog Posts" />
      <div className={styles.container}>

        <div className={styles.grid}>
          {data.map((blog: Blog) => (
            <Card
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              createdAt={blog.createdAt}
            />
          ))}
        </div>

      </div>

    </div>
  );
}
