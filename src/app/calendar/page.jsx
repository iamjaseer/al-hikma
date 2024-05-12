'use client'
import Link from "next/link"
import Header from "../Components/Header"
import { useRouteGuardContext } from "../Context/RouteGuardContext"
import { useUserContext } from "../Context/userContext"
import { useEffect, useState } from "react"





export default function CalenderSetting() {


    //CONTEXT
    const { loading, setLoading } = useRouteGuardContext()
    const { loginUser } = useUserContext()

    //STATE
    const [userData, setUserData] = useState('')


    useEffect(() => {

        //LOGIN USER
        const activeUser = async () => {
            try {
                const result = await loginUser.email;
                setUserData(result);
                setLoading(true)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        activeUser()

    }, []);

    return (
        <>

            {!loading && <div className="h-screen flex items-center justify-center" role="status">
                <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-sky-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>}
            {loading &&

                <>
                    <div className="bg-gray-100  px-6 py-5">
                        <Header type="page-header" title="കലണ്ടർ സെറ്റിങ് 2024 - 2025" />
                        <div className="mt-5 gap-4 h-screen pb-24">
                            <Link href={`/calendar/holidays-${new Date().getFullYear()}-${new Date().getFullYear() + 1}`} className="bg-white rounded-xl p-6 flex justify-between items-center gap-4 w-full text-blue-800 mb-7">
                                <p className="text-xl m-0 pt-2 pl-3 font-semibold">അവധി ദിനങ്ങൾ</p>
                                {/* <span className="bg-sky-50 text-sky-500 rounded-full items-center  w-10 h-10 flex justify-center font-semibold number">4</span> */}
                            </Link>
                            <Link href={`/calendar/exam-${new Date().getFullYear()}-${new Date().getFullYear() + 1}`} className="bg-white rounded-xl p-6 flex justify-between items-center gap-4 w-full text-blue-800 mb-7">
                                <p className="text-xl m-0 pt-2 pl-3 font-semibold">പരീക്ഷ ദിനങ്ങൾ </p>
                                {/* <span className="bg-sky-50 text-sky-500 rounded-full items-center  w-10 h-10 flex justify-center font-semibold number">4</span> */}
                            </Link>
                            <Link href={`/calendar/public-exam-${new Date().getFullYear()}-${new Date().getFullYear() + 1}`} className="bg-white rounded-xl p-6 flex justify-between items-center gap-4 w-full text-blue-800 mb-7">
                                <p className="text-xl m-0 pt-2 pl-3 font-semibold">പൊതു പരീക്ഷ </p>
                                {/* <span className="bg-sky-50 text-sky-500 rounded-full items-center  w-10 h-10 flex justify-center font-semibold number">4</span> */}
                            </Link>
                        </div>
                        {userData == 'jaseerali2012@gmail.com' ? <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-start items-center gap-5 p-4 text-blue-800 font-semibold">
                            <Link href="/leave-application" className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-500 rounded-md p-4 text-white font-bold text-lg transition-all block text-center">മാറ്റം വരുത്തുക </Link>
                        </div> : null}
                    </div>

                </>

            }
        </>
    )


}
