import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";
import { useAppContext } from '@/store';

interface Props {
    title: string;
}

const Header: React.FC<Props> = ({ title }) => {
    const { user } = useAppContext();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div className={styles.menuContainer}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.avatarContainer}>
                {user ? (
                    <>
                        <img
                            src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user.email}`}
                            alt="User Avatar"
                            onClick={() => setShowMenu(!showMenu)}
                            className={styles.avatar}
                        />
                        {showMenu && (
                            <div className={styles.menu}>
                                <button onClick={() => router.push('/')}>Home</button>
                                <button onClick={() => router.push('/dashboard')}>My Blogs</button>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </>
                ) : (
                    <button
                        className={styles.loginButton}
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
