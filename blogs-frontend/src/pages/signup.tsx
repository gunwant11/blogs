import React, { useState } from 'react';
import styles from '@/styles/Auth.module.css';
import { handleSignIn } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useAppContext } from '@/store';

interface Props { }

interface Errors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    result?: string;
}

const Signup: React.FC<Props> = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
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

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            setLoading(true);
            try {
                const user = await handleSignIn(email, password);
                setUser(user);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setErrors({});
                router.push('/login');
            } catch (error) {
                console.error(error);
                setErrors({ result: 'Sign up failed. Please try again.' });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.signinForm}>
                    <h2 className={styles.title}>Create Account</h2>
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
                        <div className={styles.inputGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
                        </div>
                        {errors.result && <span className={styles.error}>{errors.result}</span>}
                        <button
                            className={styles.formButton}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                        <div className={styles.account}>
                            Already have an account?{' '}
                            <span
                                onClick={() => router.push('/login')}
                                className={styles.link}
                            >
                                Login
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
