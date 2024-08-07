import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { Blog } from '@/types/blog';

interface ICreateBlog {
    onClose: () => void;
    setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}


interface ApiResponse {
    data: Blog;
}

const CreateBlog: React.FC<ICreateBlog> = ({ onClose, setBlogs }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string>('');

    const createBlog = async () => {
        if (!title || !content) {
            setError('Title and content are required');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, content })
            });

            if (!res.ok) {
                throw new Error('Failed to create blog post');
            }

            const data = await res.json() as Blog;
            onClose();
            setBlogs((prevBlogs: Blog[]) => [data, ...prevBlogs]);
        } catch (e: any) {
            setError(e.message as string);
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>
                        Create Blog
                    </h1>
                    <button className={styles.close} onClick={onClose}>x</button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    className={styles.textarea}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button className={styles.button} onClick={createBlog}>
                    Create
                </button>
            </div>
        </div>
    )
}

export default CreateBlog;
