'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";


const ProfileContext = createContext({})



export const ProfileContextProvider = ({ children }) => {


   
    const [profile, setProfile] = useState('dd')
    
   



    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    )
};

export const useProfileContext = () => useContext(ProfileContext);





