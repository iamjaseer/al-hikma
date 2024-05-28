'use client'

import { createContext, useContext, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useProfileContext } from "./profileContext";


const UserContext = createContext({})



export const UserContextProvider =  ({ children }) => {


  

    const [loginUser, setLoginUser] = useState()



    const auth = getAuth();


    onAuthStateChanged(auth, (user) => {


        setLoginUser(user)
       
  

        // if (user) {
        
        //     router.push(`/dashboard`)
  
        // } else {
        //   router.push(`/login`)
        //   console.log('Signed Out')
        // }
      });

   

    
      

  

    return (
        <UserContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => useContext(UserContext);





