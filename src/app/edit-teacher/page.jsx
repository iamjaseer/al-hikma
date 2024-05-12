'use client'
import Header from "../Components/Header"
import Swal from 'sweetalert2'
import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { useRouter } from 'next/navigation'
import { useTeacherContext } from "../Context/teacherContext"
import { useRouteGuardContext } from "../Context/RouteGuardContext"
import { useUserContext } from "../Context/userContext"


export default function AddTeacher() {

    const { teacher } = useTeacherContext()

    const router = useRouter()


    //FIREBASE Ref
    const teachersCollectionRef = collection(db, "teachers")


    //CONTEXT
    const { loading, setLoading } = useRouteGuardContext()
    const { loginUser } = useUserContext()


    //STATES
    const [name, setName] = useState('')
    const [salary, setSalary] = useState('')
    const [editProfile, setEditProfile] = useState(false)
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [userInfoStatus, setUserInfoStatus] = useState(false);
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


        if (!teacher.length == 0) {
            setUserInfoStatus(true)
        }
    }, [name, salary]);


    // Validate form 
    const validateForm = () => {
        let errors = {};

        if (!name) {
            errors.name = 'Name is required.';
        }


        if (!salary) {
            errors.salary = 'Salary is required.';
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


    //UPDATE TEACHER
    const updateTeacher = async () => {

        validateForm()

        if (isFormValid) {
            swalWithBootstrapButtons.fire({
                title: "ശ്രെദ്ധിക്കുക ",
                text: "മാറ്റം വരുത്തണോ?",
                position: 'bottom-end',
                cancelButtonText: 'ഒഴിവാക്കുക ',
                showCancelButton: true,
                confirmButtonText: "സ്ഥിദീകരിക്കുക",
            }).then((result) => {
                if (result.isConfirmed) {

                    try {
                        const teachersDoc = doc(teachersCollectionRef, teacher[1])
                        updateDoc(teachersDoc, {
                            name: name,
                            salary: salary
                        })
                        console.log('success')
                        router.push(`/all-teachers`)
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


    //DELETE TEACHER
    const deleteTeacher = async () => {

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


                    deleteDoc(doc(teachersCollectionRef, teacher[1]));


                    //deleteDoc(teachersDoc)
                    router.push(`/all-teachers`)
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


    if (!userData == 'jaseerali2012@gmail.com') {
        router.push(`/login`)
    }


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
                    <div className="bg-gray-100  px-6 py-5 capitalize">
                        <Header type="page-header" title={userInfoStatus && teacher[0].name} />
                        <div className="mt-5 gap-4 h-screen pb-24">
                            <div className="grid gap-3 items-center h-full w-100">

                                {!editProfile && <div className="grid gap-3">
                                    <div className="rounded-md h-12 px-4 w-full border-0 bg-white flex justify-start items-center">
                                        {userInfoStatus && teacher[0].name}
                                    </div>
                                    <div className="rounded-md h-12 px-4 w-full border-0 bg-white flex justify-start items-center">
                                        {userInfoStatus && teacher[0].salary}
                                    </div>
                                </div>}
                                {editProfile && <div className="grid gap-3 ">
                                    <input
                                        type="text"
                                        className="rounded-md h-12 px-4 w-full border-0"
                                        placeholder="പേര്"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    {errors.name && <p>{errors.name}</p>}
                                    <input
                                        type="number"
                                        className="rounded-md h-12 px-4 w-full border-0 number font-bold"
                                        placeholder="ശമ്പളം"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        required
                                    />
                                    {errors.salary && <p>{errors.salary}</p>}
                                </div>}
                            </div>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-start items-center gap-5 p-4 text-blue-800 font-semibold">
                            {!editProfile && <button onClick={deleteTeacher} className=" bg-white border border-blue-800 hover:bg-blue-800 active:bg-blue-800 rounded-md p-4 text-blue-800 hover:text-white active:text-white font-bold text-lg transition-all block text-center  w-full ">നീക്കം ചെയുക </button>}
                            {!editProfile && <button onClick={() => setEditProfile(!editProfile)} className=" bg-sky-400 hover:bg-sky-500 active:bg-sky-500 rounded-md p-4 text-white font-bold text-lg transition-all block text-center  w-full ">മാറ്റം വരുത്തുക</button>}
                            {editProfile && <button onClick={updateTeacher} className=" bg-sky-400 hover:bg-sky-500 active:bg-sky-500 rounded-md p-4 text-white font-bold text-lg transition-all block text-center  w-full ">സംരക്ഷിക്കുക </button>}
                        </div>
                    </div>

                </>

            }
        </>
    )



}
