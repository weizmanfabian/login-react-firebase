import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "../pages/Index";
import AplicationRoute from "./AplicationRoute";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../data/Firebase';



//router principal
const PrincipalRoute = () => {

    const [user, setUser] = useState('');

    useEffect(() => {
        const unsubscribe = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    const uid = user.uid;
                    setUser(user)
                    // ...
                } else {
                    // User is signed out
                    // ...
                    setUser('')
                }
            });
        }
        return () => unsubscribe()
    }, [])

    return (
        <BrowserRouter>
            <Routes>

                {/* página principal */}
                <Route path="/" element={<Index />} />

                {/* rutas públicas */}
                <Route
                    path="/auth/*"
                    element={
                        <PublicRoute isLogged={user}>
                            <AuthRoute setUser={setUser} />
                        </PublicRoute>
                    }
                />

                {/* rutas privadas */}
                <Route
                    path="/app/*"
                    element={
                        <PrivateRoute isLogged={user}>
                            <AplicationRoute user={user} setUser={setUser} />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/auth/login" replace />}
                />
            </Routes>

        </BrowserRouter>
    );
}

export default PrincipalRoute;