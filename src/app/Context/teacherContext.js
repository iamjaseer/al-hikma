'use client'

import { createContext, useContext, useState } from "react";



const TeacherContext = createContext({})



export const TeacherContextProvider = ({ children }) => {



    const [teacher, setTeacher] = useState([])


    




    return (
        <TeacherContext.Provider value={{ teacher, setTeacher }}>
            {children}
        </TeacherContext.Provider>
    )
};

export const useTeacherContext = () => useContext(TeacherContext);





