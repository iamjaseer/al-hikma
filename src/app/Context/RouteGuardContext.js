'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import { useRouter } from 'next/navigation'


const RouteGuardContext = createContext({})



export const RouteGuardContextProvider = ({ children }) => {

    const router = useRouter();

     //CONTEXT
     const { loginUser } = useUserContext()



     useEffect(() => {
        authCheck()
    }, []);


    function authCheck() {
      if (loginUser) {
             router.push(`/dashboard`)
            
           } else {
            router.push(`/login`)
           
       }
    }

    const [loading, setLoading] = useState(false)


    return (
        <RouteGuardContext.Provider value={{ loading, setLoading }}>
           {children}
        </RouteGuardContext.Provider>
    )
};

export const useRouteGuardContext = () => useContext(RouteGuardContext);





