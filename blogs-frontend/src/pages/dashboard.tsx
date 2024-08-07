import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Card from "@/components/Card";
import CreateBlog from "@/components/CreateBlog";
import Header from "@/components/Header";
import { useAppContext } from "@/store";
import withAuth from "@/utils/withauth";

interface Blog {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

const Dashboard: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { user } = useAppContext();

    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?author=${user.userId}`);
            if (!res.ok) {
                throw new Error('Failed to fetch blogs');
            }
            const data: Blog[] = await res.json();
            setBlogs(data);
        } catch (e) {
            console.error(e);
            setError('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <div className={styles.wrapper}>
            <Header title="My Blogs" />
            <div className={styles.container}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className={styles.error}>{error}</p>
                ) : (
                    <div className={styles.grid}>
                        <button className={styles.fab} onClick={() => setShowModal(true)}>+</button>
                        {blogs.map((blog) => (
                            <Card
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                content={blog.content}
                                createdAt={blog.createdAt}
                            />
                        ))}
                    </div>
                )}
            </div>
            {showModal && <CreateBlog onClose={() => setShowModal(false)} setBlogs={setBlogs} />}
        </div>
    );
};

export default withAuth(Dashboard);
