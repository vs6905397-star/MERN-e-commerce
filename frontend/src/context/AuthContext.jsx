import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/authApi";

 const AuthContext = createContext();
  
 export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const data = await  getCurrentUser();
            setUser(data);
        } catch (error) {
            setUser(null);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    },[]);

    return (
        <AuthContext.Provider value={{user, setUser, loading, fetchUser}}>
            {children}
        </AuthContext.Provider>
    );
 };

 export const useAuth = () => useContext(AuthContext);