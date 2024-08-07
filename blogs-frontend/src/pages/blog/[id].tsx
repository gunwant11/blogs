import React from "react";
import styles from "@/styles/Blog.module.css";
import Header from "@/components/Header";
import { Blog } from "@/types/blog";
import { GetStaticPropsContext } from "next";
type Props = {
    data: any;
};

export async function getStaticPaths() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        const paths = data.map((blog: Blog) => ({
            params: { id: blog.id.toString() },
        }));
        return { paths, fallback: false };
    } catch (error) {
        console.error('Error in getStaticPaths:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    try {
        const id = params?.id;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch blog post');
        const data = await response.json();
        return {
            props: { data },
        };
    } catch (error) {
        console.error('Error in getStaticProps:', error);
        return {
            props: { data: null },
            revalidate: 10,
        };
    }
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
