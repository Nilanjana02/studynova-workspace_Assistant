import { Children, createContext, useState } from "react";
export const AppContext = createContext();
export const AppContextProvider = (props)=>{
    
    const BackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const [isLoggedin,setIsLoggedin] = useState(false)
    const [userData,setUserData] = useState(false)


    const value = {
        BackendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData

    }
    return(
        <AppContext.Provider value = {value}>
         {props.children}
        </AppContext.Provider>

    )
    
 }
