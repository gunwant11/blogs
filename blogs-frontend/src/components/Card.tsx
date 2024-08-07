import React from 'react'
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';

interface ICard {
    title: string;
    content: string;
    createdAt: string;
    id: string;
}

const Card = ({ title, content, createdAt, id }: ICard) => {
    const router = useRouter();
    return (
        <div className={styles.card}>
            <h2 className={styles.cardtitle}>{title}</h2>
            <div className={styles.content}>{content && content.substring(0, 100)}...</div>
            <div className={styles.date}>Created at: {new Date(createdAt).toString().substring(3, 15)}</div>
            <div className={styles.buttonContainer}>
                <button className={styles.button}
                    onClick={() => { router.push(`/blog/${id}`) }}
                >Read More</button>
            </div>
        </div>
    )
}

export default Card