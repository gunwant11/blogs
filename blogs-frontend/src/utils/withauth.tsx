// hoc/withAuth.tsx
import { useAppContext } from '@/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const Wrapper = (props: any) => {
        const { user } = useAppContext();
        const router = useRouter();

        useEffect(() => {
            if (!user) {
                router.replace('/login');
            }
        }, [user, router]);

        if (!user) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
