// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { validateToken } from './auth.service';
import { errorCodes } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
// import { verifyToken } from './api'; // Function to verify token from backend

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(" token : ", token);

        if (token) {
            validateToken({ token })
                .then((response) => {
                    console.log("resp : ", response);
                    if (response.status === errorCodes.Unauthorized) {
                        localStorage.removeItem('token')

                        setIsAuthenticated(false)
                    } else {
                        setIsAuthenticated(true)
                    }

                })
                .catch(() => setIsAuthenticated(false));
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
