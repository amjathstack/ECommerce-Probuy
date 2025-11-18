import { signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth"
import { createContext, useContext, useEffect } from "react"
import { useState } from "react"
import { auth } from "@/firebase"
import axios from "axios"


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const URL = "http://localhost:3000/api";
    const [user, setUser] = useState();

    const getUser = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            const userData = await axios.get(`${URL}/user`, { headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`} });
            setUser(userData.data.message[0])
        } catch (error) {
            return console.log(error.message)
        }
    }

    const getCurrentUser = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUser();
            } else {
                setUser()
                console.log('User logged out')
            }
        })
    }

    const signupUser = async (Data) => {
        try {
            const userCredetial = await createUserWithEmailAndPassword(auth, Data.get('email'), Data.get('password'));
            const formData = new FormData();
            formData.append('firebaseUid', userCredetial.user.uid);
            formData.append('name', Data.get('name'));
            formData.append('email', Data.get('email'));

            await axios.post(`${URL}/user`, formData, { headers: { 'Content-Type': 'application/json' } });

            signInUser(Data.get('email'), Data.get('password'));

        } catch (error) {
            return console.log(error.message);
        }
    }

    const signInUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            getCurrentUser()
        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = () => {
        try {
            signOut(auth)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    const values = {
        user,
        signInUser,
        logout,
        signupUser,
        getCurrentUser,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const authUser = () => useContext(AuthContext);