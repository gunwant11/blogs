import React, { createContext, useContext, useState, ReactNode } from 'react';


type AppContextType = {
    user: any;
    setUser: React.Dispatch<any>;
};
const MyContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);

    const value: AppContextType = {
        user,
        setUser,
    };

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
