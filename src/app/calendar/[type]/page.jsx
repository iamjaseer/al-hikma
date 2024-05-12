'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { useRouter } from "next/navigation"
import Header from "../../Components/Header"
import { db } from "../../firebase/config"
import Swal from "sweetalert2"
import { useRouteGuardContext } from "../../Context/RouteGuardContext"
import { useUserContext } from "../../Context/userContext"




export default function CalenderSettingType({ params }) {


    let { type } = params


    const router = useRouter()


    //FIREBASE DB
    const calenderCollectionRef = collection(db, type)


    //CONTEXT
    const { loading, setLoading } = useRouteGuardContext()
    const { loginUser } = useUserContext()


    //STATES
    const [calender, setCalender] = useState([])
    const [day, setDay] = useState('')
    const [reason, setReason] = useState('')
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
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
        getCalender()

    }, [day, reason]);


    // Validate form 
    const validateForm = () => {
        let errors = {};

        if (!day) {
            errors.day = 'Date is required.';
        }

        if (!reason) {
            errors.reason = 'Reason is required.';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };


    //OWL SETTINGS
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-500 rounded-md p-4 text-white font-bold text-lg transition-all",
            cancelButton: "w-full bg-transparent hover:bg-blue-500 active:bg-blue-500 hover:text-white active:text-white border border-blue-800 rounded-md p-4 text-blue-800 font-bold text-lg transition-all mt-3",
            title: "text-blue-800"
        },
        buttonsStyling: false
    });


    //GT ALL DATA
    const getCalender = async () => {



        const data = await getDocs(calenderCollectionRef)

        const filteredData = data.docs.map((doc) => (
            {
                ...doc.data(),
                id: doc.id
            }
        ))
        setCalender(filteredData)
        // setLoading(false)
        //  console.log(data)
    }


    //ADD NEW DATA
    const addCalender = async () => {

        validateForm()

        if (isFormValid) {

            swalWithBootstrapButtons.fire({
                title: "ശ്രെദ്ധിക്കുക ",
                text: "ചേർക്കാനോ?",
                position: 'bottom-end',
                cancelButtonText: 'ഒഴിവാക്കുക ',
                showCancelButton: true,
                confirmButtonText: "സ്ഥിദീകരിക്കുക",
            }).then((result) => {
                if (result.isConfirmed) {

                    try {
                        addDoc(calenderCollectionRef, {
                            date: day,
                            reason: reason,
                            year: new Date().getFullYear(),
                        })
                        console.log('success')
                        //console.log(auth.currentUser)
                        router.push(`/calendar`)

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

    }


    //DELETE CALENDER
    const deleteCalender = async (calenderId) => {

        swalWithBootstrapButtons.fire({
            title: "ശ്രെദ്ധിക്കുക ",
            text: "നീക്കം ചെയ്യണോ?",
            position: 'bottom-end',
            cancelButtonText: 'ഒഴിവാക്കുക ',
            showCancelButton: true,
            confirmButtonText: "സ്ഥിദീകരിക്കുക",
        }).then((result) => {
            if (result.isConfirmed) {

                try {
                    //const teachersDoc = doc(teachersCollectionRef, teacher[1])


                    deleteDoc(doc(calenderCollectionRef, calenderId));


                    //deleteDoc(teachersDoc)
                    router.push(`/calendar`)
                    console.log('success')
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

    function pageHeading() {

        switch (type) {
            case `holidays-${new Date().getFullYear()}-${new Date().getFullYear() + 1}`:
                return `അവധി ദിനങ്ങൾ ${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`
                break;
            case `exam-${new Date().getFullYear()}-${new Date().getFullYear() + 1}`:
                return `പരീക്ഷ ദിവസങ്ങൾ ${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`
                break;
            case `public-exam-${new Date().getFullYear()}-${new Date().getFullYear() + 1}`:
                return `പൊതു പരീക്ഷ ദിവസങ്ങൾ ${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`
                break;
        }
    }

    // അവധി ദിനങ്ങൾ 2024 - 2025


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
                        <Header type="page-header" title={pageHeading()} />


                        <div className="mt-5 gap-4 h-screen pb-24">
                            {
                                calender.map((calender) => (
                                    <div className="bg-white rounded-xl justify-between items-center w-full text-blue-800 overflow-hidden border-0 mb-7">
                                        <span className="p-4 border-b border-b-gray-100 block">{calender.date}</span>
                                        <div className="flex justify-between items-center pe-3 ps-3 py-1">
                                            <span className="p-4 block font-bold">{calender.reason}</span>
                                            {userData == 'jaseerali2012@gmail.com' ?
                                                <button onClick={(e) => deleteCalender(calender.id)} className="rounded-lg bg-white border pt-2 pb-1 px-3 text-red-600 text-sm transition-all">
                                                    ഒഴിവാക്കുക
                                                </button>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            {userData == 'jaseerali2012@gmail.com' && !calender.length == 0 ? <h6 className="text-xl  font-semibold text-blue-800 my-5">കൂടുതൽ ചേർക്കുക </h6> : ''}
                            {userData == 'jaseerali2012@gmail.com' ? <div className="bg-white rounded-xl justify-between items-center w-full text-blue-800 overflow-hidden border-0 mb-7">

                                <input
                                    type="date"
                                    className="rounded-md h-12 px-4 w-full  border-b border-b-gray-100"
                                    placeholder="ദിവസം"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    required
                                />
                                {errors.day && <p className="p-3 text-red-600">{errors.day}</p>}
                                <input
                                    type="text"
                                    className="rounded-md h-12 px-4 w-full  border-b border-b-gray-100"
                                    placeholder="അവധി"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                />
                                {errors.reason && <p className="p-3 text-red-600">{errors.reason}</p>}

                            </div>
                                : null
                            }
                        </div>
                        {userData == 'jaseerali2012@gmail.com' ?
                            <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-start items-center gap-5 p-4 text-blue-800 font-semibold">
                                <button onClick={addCalender} className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-500 rounded-md p-4 text-white font-bold text-lg transition-all block text-center">മാറ്റം വരുത്തുക </button>
                            </div>
                            : null}
                    </div>

                </>

            }
        </>
    )



}



