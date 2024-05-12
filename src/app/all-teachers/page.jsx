'use client'
import Link from "next/link"
import Header from "../Components/Header"
import { db } from "../firebase/config"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useTeacherContext } from "../Context/teacherContext"
import { useRouter } from "next/navigation"
import { useUserContext } from "../Context/userContext"





export default function AllTeachers() {



    const router = useRouter()

    //FIREBASE DB
    const teachersCollectionRef = collection(db, "teachers",)

    //CONTEXT
    const { loginUser } = useUserContext()
    const { teacher, setTeacher } = useTeacherContext()

    //STATES
    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState('')


    useEffect(() => {

            //LOGIN USER
    const activeUser = async () => {
        try {
          const result = await loginUser.email;
          setUserData(result);
          setLoading(true)
          //console.log(result)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

        activeUser()
        getTeachersList()

    }, []);



    //GT ALL TEACHERS
    const getTeachersList = async () => {
        const data = await getDocs(query(teachersCollectionRef, where('userRole', '==', 'teacher')))

        //await getDocs(teachersCollectionRef)

        const filteredData = data.docs.map((doc) => (
            {
                ...doc.data(),
                id: doc.id
            }
        ))
        setTeachers(filteredData)
        setLoading(false)
        //  console.log(data)
    }


    //GET TEACHER BY COLLECTION ID
    const viewTeacher = async (documentId, teacherId) => {
        const data = query(teachersCollectionRef, where("userId", "==", teacherId))
        const querySnapshot = await getDocs(data);
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            setTeacher([doc.data(), documentId])
            router.push(`/edit-teacher`)
        });


    }



    if(!userData == 'jaseerali2012@gmail.com'){
        router.push(`/login`)
    }

    return (
        <div className="bg-gray-100  px-6 py-5">
            <Header type="page-header" title="അദ്ധ്യാപകർ" />
            <div className="mt-5 gap-4 h-screen pb-24">
                {loading && <div className="h-screen flex items-center justify-center" role="status">
                    <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-sky-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>}

                <ul className="list-none grid gap-5">
                    {
                        teachers.map((teacher) => (
                            <li className="bg-white rounded-xl p-5 pl-7 capitalize flex justify-between items-center gap-4">
                                <p className="text-base capitalize text-blue-800 font-semibold m-0">{teacher.name}</p>
                                <button onClick={(e) => viewTeacher(teacher.id, teacher.userId)} className="rounded-lg bg-sky-400 hover:bg-sky-500 active:bg-sky-500 p-4 text-white font-bold text-lg transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                                        <path fill="#fff" fill-rule="evenodd" d="M2.904 1.029a.312.312 0 0 1 .442 0l3.75 3.75a.313.313 0 0 1 0 .442l-3.75 3.75a.313.313 0 0 1-.442-.442L6.434 5l-3.53-3.529a.313.313 0 0 1 0-.442Z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-start items-center gap-5 p-4 text-blue-800 font-semibold">
                <Link href="/add-teacher" className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-500 rounded-md p-4 text-white font-bold text-lg transition-all block text-center">അദ്ധ്യാപകരെ ചേർക്കുക  </Link>
            </div>
        </div>
    )
}
