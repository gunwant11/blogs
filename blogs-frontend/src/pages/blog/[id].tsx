import React from "react";
import styles from "@/styles/Blog.module.css";
import Header from "@/components/Header";
import { Blog } from "@/types/blog";
type Props = {
    data: any;
};

export async function getStaticPaths() {
    const blogs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
    const data = await blogs.json();
    const paths = data.map((blog: Blog) => ({
        params: { id: blog.id.toString() },
    }));
    return { paths, fallback: false };
}

import { GetStaticPropsContext } from "next";

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const id = params?.id;
    const blog = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/post?id=${id}`
    );
    const data = await blog.json();
    console.log(data);

    return {
        props: { data },
    };
}

const Page = (props: Props) => {

    return (
        <div className={styles.wrapper}>
            <Header title="Blog Posts" />


            <div className={styles.box}>
                <h2 className={styles.title}>
                    <span className={styles.back}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    d="M14 7L9 12L14 17"
                                    stroke="#333"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>{" "}
                            </g>
                        </svg>
                    </span>
                    {props.data.title}
                </h2>
                <div className={styles.avatarContainer}>
                    <img src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${Math.random()}`} alt='hero' className={styles.avatar} />
                    <div className={styles.info}>
                        <span className={styles.author}>by Author</span>
                        <span className={styles.date}>
                            {new Date(props.data.createdAt).toString().slice(3, 15)}
                        </span>
                    </div>
                    <span>

                    </span>
                </div>
                <div className={styles.container}>{props.data.content}</div>
            </div>
        </div>
    );
};

export default Page;
