import { createContext, useContext, useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {


    const values = {
        
    }


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const authUser = () => useContext(AuthContext);