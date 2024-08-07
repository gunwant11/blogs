import React, { useState } from 'react';
import styles from '@/styles/Auth.module.css';
import { handleLogin } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useAppContext } from '@/store';

interface Props { }

interface Errors {
    email?: string;
    password?: string;
    result?: string;
}

const Login: React.FC<Props> = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { setUser } = useAppContext();

    const validateEmail = (email: string): boolean => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        const newErrors: Errors = {};
        let hasErrors = false;

        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email address';
            hasErrors = true;
        }

        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            setLoading(true);
            try {
                const user = await handleLogin(email, password);
                setUser(user);
                setEmail('');
                setPassword('');
                setErrors({});
                router.push('/dashboard');
            } catch (error) {
                console.error(error);
                setErrors({ result: 'Invalid email or password' });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.signinForm}>
                    <h2 className={styles.title}>Login to your account</h2>
                    <div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <span className={styles.error}>{errors.email}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <span className={styles.error}>{errors.password}</span>}
                        </div>
                        {errors.result && <span className={styles.error}>{errors.result}</span>}
                        <button
                            className={styles.formButton}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        <div className={styles.account}>
                            Don&apos;t have an account?{' '}
                            <span
                                onClick={() => router.push('/signup')}
                                className={styles.link}
                            >
                                Sign Up
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
