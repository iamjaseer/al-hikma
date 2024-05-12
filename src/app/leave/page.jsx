'use client'
import Link from "next/link"
import Header from "../Components/Header"
import { db } from "../firebase/config"
import { useEffect, useState } from "react"
import { collection, getDocs, deleteDoc, doc, updateDoc, where, query } from "firebase/firestore"
import Swal from 'sweetalert2'
import { useRouteGuardContext } from "../Context/RouteGuardContext"
import { useUserContext } from "../Context/userContext"
import { useRouter } from "next/navigation"
import { isNull } from "util"




export default function Leave() {

    const router = useRouter()

    //CONTEXT
    const { loading, setLoading } = useRouteGuardContext()
    const { loginUser } = useUserContext()


    //FIREBASE DB
    const leaveCollectionRef = collection(db, "leave",)

    //STATES
    const [leave, setLeave] = useState([])
    const [allLeave, setAllLeave] = useState([])
    const [userData, setUserData] = useState('')



    //OWL SETTINGS
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-500 rounded-md p-4 text-white font-bold text-lg transition-all",
            cancelButton: "w-full bg-transparent hover:bg-blue-500 active:bg-blue-500 hover:text-white active:text-white border border-blue-800 rounded-md p-4 text-blue-800 font-bold text-lg transition-all mt-3",
            title: "text-blue-800"
        },
        buttonsStyling: false
    });


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
        getLeaveList()
        getAllLeaveList()

    }, []);





    
        
    //GT Leave list by uid 
    const getLeaveList = async () => {

        try {

            const userId = await loginUser.uid
            const data = await getDocs(query(leaveCollectionRef, where('teacherId', '==', userId)))


            const filteredData = data.docs.map((doc) => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ))
            setLeave(filteredData)
          
         

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    //GET ALL LEAVE LIST
    const getAllLeaveList = async () => {

        try {

          
            const data = await getDocs(query(leaveCollectionRef, where('status', '==', 'pending')))

            const filteredData = data.docs.map((doc) => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ))
            setAllLeave(filteredData)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }




    //DATE MALAYALAM

    function dateMalayalam(date) {

        const month = date.replace(/-/g, "").slice(4, 6).replace(/^0+/, '');

        switch (month) {
            case '1':
                return 'ജനുവരി'
                break;
            case '2':
                return 'ഫെബ്രുവരി '
                break;
            case '3':
                return 'മാർച്ച്'
                break;
            case '4':
                return 'ഏപ്രിൽ'
                break;
            case '5':
                return 'മെയ്'
                break;
            case '6':
                return 'ജൂൺ'
                break;
            case '7':
                return 'ജൂലൈ'
                break;
            case '8':
                return 'ഓഗസ്റ്റ്'
                break;
            case '9':
                return 'സെപ്റ്റംബർ'
                break;
            case '10':
                return 'ഒക്ടോബർ'
                break;
            case '11':
                return 'നവംബർ'
                break;
            case '12':
                return 'ഡിസംബർ'
                break;
        }
    }


     //CHANGE LEAVE STATUS
     const changeLeaveStatus = async (status, leaveId) => {

        swalWithBootstrapButtons.fire({
            title: "ശ്രെദ്ധിക്കുക ",
            text: "മാറ്റം വരുത്താനോ?",
            position: 'bottom-end',
            cancelButtonText: 'ഒഴിവാക്കുക ',
            showCancelButton: true,
            confirmButtonText: "സ്ഥിദീകരിക്കുക",
        }).then((result) => {
            if (result.isConfirmed) {

                try {
                    const leaveDoc = doc(leaveCollectionRef, leaveId)
                    updateDoc(leaveDoc, {
                        status: status,
                    })
                    console.log('success')
                    getAllLeaveList()
                   // router.push(`/leave`)
                } catch (err) {
                    console.log('error')
                    console.log(err)
                }


            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

    //REMOVE LEAVE
    const removeLeave = async (leaveId) => {
        swalWithBootstrapButtons.fire({
            title: "ശ്രെദ്ധിക്കുക ",
            text: "ഒഴിവാക്കാനോ?",
            position: 'bottom-end',
            cancelButtonText: 'ഒഴിവാക്കുക ',
            showCancelButton: true,
            confirmButtonText: "സ്ഥിദീകരിക്കുക",
        }).then((result) => {
            if (result.isConfirmed) {

                // try {
                //     deleteDoc(doc(leaveCollectionRef, leaveId));
                //     getLeaveList()
                //     console.log('success')
                // } catch (err) {
                //     console.log('error')
                //     console.log(err)
                // }


                try {
                    const leaveDoc = doc(leaveCollectionRef, leaveId)
                    updateDoc(leaveDoc, {
                        status: 'Canceled',
                    })
                    console.log('success')
                    getLeaveList()
                   // router.push(`/leave`)
                } catch (err) {
                    console.log('error')
                    console.log(err)
                }


            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

   

   // console.log(leave)
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
                        <Header type="page-header" title={`ലീവ് അപ്ലിക്കേഷൻ ${new Date().getFullYear()}`} />
                        <div className="mt-5 gap-4 pb-24 min-h-screen">
                            <ul className="grid gap-7">

                                {
                                    userData == 'jaseerali2012@gmail.com' ? allLeave.map((leave, key) => (
                                        <>
                                            <li className="bg-white rounded-xl p-6 grid gap-4" key={key}>
                                                <div className="grid gap-2">
                                                    <p className="text-xl font-semibold text-blue-800 m-0">{leave.leaveDay.replace(/-/g, "").slice(-2)} {dateMalayalam(leave.leaveDay)} {leave.leaveDay.replace(/-/g, "").slice(0, 4)}</p>
                                                    <p className="text-blue-800">{leave.reason}</p>
                                                </div>
                                                {leave.status == 'pending' && <div className="w-full bg-yellow-50  rounded-md p-4 text-yellow-500 font-bold text-lg text-center">പരിശോദിക്കുന്നു</div>}
                                                {leave.status == 'approved' && <div className="w-full bg-green-50  rounded-md p-4 text-green-500 font-bold text-lg text-center">അനുവദിച്ചു</div>}
                                                {leave.status == 'rejected' && <div className="w-full bg-red-50 rounded-md p-4 text-red-500 font-bold text-lg text-center">അനുവദിച്ചിട്ടില്ല</div>}
                                                {userData == 'jaseerali2012@gmail.com' ?
                                                    <>
                                                        <button onClick={() => changeLeaveStatus('approved', leave.id)} className="w-full bg-white border border-green-500 hover:bg-green-500 active:bg-green-500 rounded-md p-4 text-green-500 hover:text-white active:text-white font-bold text-lg transition-all">അനുവദിക്കുക</button>
                                                        <button onClick={() => changeLeaveStatus('rejected', leave.id)} className="w-full bg-white border border-red-500 hover:bg-red-600 active:bg-red-600 rounded-md p-4 text-red-600 hover:text-white active:text-white font-bold text-lg transition-all">ഒഴിവാക്കുക</button>
                                                    </>
                                                    :
                                                  null
                                                }
                                            </li>
                                        </>
                                    )) : leave.map((leave, key) => (
                                        <>
                                            <li className="bg-white rounded-xl p-6 grid gap-4" key={key}>
                                                <div className="grid gap-2">
                                                    <p className="text-xl font-semibold text-blue-800 m-0">{leave.leaveDay.replace(/-/g, "").slice(-2)} {dateMalayalam(leave.leaveDay)} {leave.leaveDay.replace(/-/g, "").slice(0, 4)}</p>
                                                    <p className="text-blue-800">{leave.reason}</p>
                                                </div>
                                                {leave.status == 'pending' && <div className="w-full bg-yellow-50  rounded-md p-4 text-yellow-500 font-bold text-lg text-center">പരിശോദിക്കുന്നു</div>}
                                                {leave.status == 'approved' && <div className="w-full bg-green-50  rounded-md p-4 text-green-500 font-bold text-lg text-center">അനുവദിച്ചു</div>}
                                                {leave.status == 'rejected' && <div className="w-full bg-red-50 rounded-md p-4 text-red-500 font-bold text-lg text-center">അനുവദിച്ചിട്ടില്ല</div>}
                                                {leave.status == 'Canceled' && <div className="w-full bg-red-50 rounded-md p-4 text-red-500 font-bold text-lg text-center">ലീവ് ഉപേക്ഷിച്ചു </div>}
                                                {userData == 'jaseerali2012@gmail.com' ?
                                                    <>
                                                        <button onClick={() => changeLeaveStatus('approved', leave.id)} className="w-full bg-white border border-green-500 hover:bg-green-500 active:bg-green-500 rounded-md p-4 text-green-500 hover:text-white active:text-white font-bold text-lg transition-all">അനുവദിക്കുക</button>
                                                        <button onClick={() => changeLeaveStatus('rejected', leave.id)} className="w-full bg-white border border-red-500 hover:bg-red-600 active:bg-red-600 rounded-md p-4 text-red-600 hover:text-white active:text-white font-bold text-lg transition-all">ഒഴിവാക്കുക</button>
                                                    </>
                                                    :
                                                    !leave.status == 'Canceled' ? <button onClick={() => removeLeave(leave.id)} className="w-full bg-white border border-red-500 hover:bg-red-600 active:bg-red-600 rounded-md p-4 text-red-600 hover:text-white active:text-white font-bold text-lg transition-all">പിൻവലിക്കുക</button> : null
                                                }
                                            </li>
                                        </>
                                    ))
                                }

                            </ul>
                        </div>
                        {userData !== 'jaseerali2012@gmail.com' ?
                            <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-start items-center gap-5 p-4 text-blue-800 font-semibold">
                                <Link href="/leave-application" className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-500 rounded-md p-4 text-white font-bold text-lg transition-all block text-center">ലീവിന് അപേക്ഷിക്കുക</Link>
                            </div>
                            : null
                        }
                    </div>
                </>
            }
        </>
    )


}




