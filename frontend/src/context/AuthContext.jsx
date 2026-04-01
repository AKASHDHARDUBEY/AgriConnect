import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../services/firebase";
import { onAuthStateChanged, signInWithPopup, signOut, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    };

    const registerWithEmail = async (name, email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name });
            setUser({ ...result.user, displayName: name });
            return result.user;
        } catch (error) {
            console.error("Register Error:", error);
            throw error;
        }
    };

    const loginWithEmail = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    };

    const setupRecaptcha = (containerId) => {
        try {
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
            // Manually wipe any leftover Firebase iframe artifacts in the DOM
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '';
            }
            window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
                'size': 'invisible'
            });
        } catch (e) {
            console.error("Recaptcha setup error:", e);
        }
    };

    const loginWithPhone = async (phoneNumber) => {
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
            return confirmationResult;
        } catch (error) {
            console.error("Phone Auth Error:", error);
            throw error;
        }
    };

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, registerWithEmail, loginWithEmail, loginWithPhone, setupRecaptcha, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
