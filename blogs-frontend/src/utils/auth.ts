
const handleSignIn = async (email: string, password: string) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            return { userId: data.userId, email: data.email };

        }
        else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    }
    catch (e) {
        console.error(e);
    }
}


const handleLogin = async (email: string, password: string) => {
    try {
        // Call API to log in
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            return { userId: data.user.id, email: data.user.email };

        }
        else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    }
    catch (e) {
        console.error(e);
    }
}

export { handleSignIn, handleLogin }