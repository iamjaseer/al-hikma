'use client'
import Header from "../Components/Header"
import Swal from 'sweetalert2'
import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { useRouter } from 'next/navigation'
import { useRouteGuardContext } from "../Context/RouteGuardContext"


export default function AddTeacher() {

    const router = useRouter()


    //FIREBASE DB
    const teachersCollectionRef = collection(db, "teachers")


     //CONTEXT
    const { loading, setLoading } = useRouteGuardContext()



    //STATES
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [salary, setSalary] = useState('')
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);




    useEffect(() => {
    }, [name, email, password, salary]);


    // Validate form 
    const validateForm = () => {
        let errors = {};

        // if (!name) {
        //     errors.name = 'Name is required.';
        // }

        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }

        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        // if (!salary) {
        //     errors.salary = 'Salary is required.';
        // }
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


    //ADD NEW TEACHER
    const addNewTeacher = async () => {
      
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
                        createUserWithEmailAndPassword(auth, email, password)
                        addDoc(teachersCollectionRef, {
                            userId: auth.currentUser.uid,
                            name: name,
                            email: email,
                            salary: salary,
                            userRole: 'teacher',
                        })
                        console.log('success')
                        //console.log(auth.currentUser)
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

    //VERIFICATION
    const verifyUser = async () => {
        console.log('verification started')
        try {
            await sendEmailVerification(auth.currentUser)
            console.log('send')
        } catch (err) {
            console.log('error')
            console.log(err)
        }

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
             <div className="bg-gray-100  px-6 py-5">

<Header type="page-header" title="അദ്ധ്യാപകരെ ചേർക്കുക" />
<div className="mt-5 gap-4 h-screen pb-24">
    <div className="grid gap-3 items-center h-full w-100">
        <div className="grid gap-3 ">

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
                type="email"
                className="rounded-md h-12 px-4 w-full border-0"
                placeholder="ഇമെയിൽ"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {errors.email && <p>{errors.email}</p>}
            <input
                type="text"
                className="rounded-md h-12 px-4 w-full border-0"
                placeholder="പാസ്സ്‌വേർഡ്"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {errors.password && <p>{errors.password}</p>}
            <input
                type="number"
                className="rounded-md h-12 px-4 w-full border-0 number font-bold"
                placeholder="ശമ്പളം"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
            />
            {errors.salary && <p>{errors.salary}</p>}
        </div>
    </div>
</div>
<div className="fixed bottom-0 left-0 right-0 bg-white flex justify-start items-center gap-5 p-4 text-blue-800 font-semibold">
    <button onClick={addNewTeacher} className=" bg-sky-400 hover:bg-sky-500 active:bg-sky-500 rounded-md p-4 text-white font-bold text-lg transition-all block text-center  w-full ">ചേർക്കുക </button>
</div>
</div>
          </>
          
          }
      </>
      )
      
      
     
}
