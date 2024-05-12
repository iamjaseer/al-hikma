'use client'

import Link from "next/link";
import { useEffect, useState } from "react"
import { signInWithEmailAndPassword, sendPasswordResetEmail, getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useUserContext } from "../Context/userContext";
import { useRouter } from 'next/navigation'


import { useRouteGuardContext } from "../Context/RouteGuardContext";




export default function Login() {


    //CONTEXT
    const { user, setUser } = useRouteGuardContext()
    const { test } = useRouteGuardContext()

    const router = useRouter()




        
   



    //STATES
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);


    


    // Validate form 
    const validateForm = () => {
        let errors = {};
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }

        if (!password) {
            errors.password = 'Password is required.';
        } 
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };


    const loginForm = async () => {
        console.log('clicked')
        validateForm()

        if (isFormValid) {
            try {
                //await createUserWithEmailAndPassword(auth, email, password)
                await signInWithEmailAndPassword(auth, email, password)
                console.log('Login success')
                setUser(auth.currentUser)

        // if(auth.currentUser.email == "jaseerali2012@gmail.com"){
        //     router.push(`/admin`)
        // }
        // else{
        //     router.push(`/teachers`)
        // }

        router.push(`/dashboard`)



                //console.log(auth.currentUser.accessToken)
                //await sendEmailVerification(auth.currentUser)
               // console.log('verification send')
            
            } catch (err) {
                console.log(err)
                setMessage('Invalid email and password')
            }
        }

    }



    const reset = async () => {
        try {
            //await createUserWithEmailAndPassword(auth, email, password)
            await sendPasswordResetEmail(auth, email, password)
            console.log('success')
         
        } catch (err) {
            console.log('error')
            console.log(err)
        }
    }



    const auth = getAuth();

   

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            
                router.push(`/dashboard`)
      
            } else {
              router.push(`/login`)
              console.log('Signed Out')
            }
          });
     
    }, []);
  

    return (
        <>
      
            <div className="bg-indigo-600 bg-primary h-screen flex items-center justify-center px-6 py-5">
                {test}
                {/* OUT OF LOCATION */}
                <div className="text-start grid items-center justify-center gap-52">
                    <div className="grid gap-3">
                        <small className="text-sky-400">BRAND NAME</small>
                        <h1 className="text-2xl sm:text-2xl font-bold text-white">അക്കൗണ്ടിലേക്കു പ്രവേശിക്കുക</h1>
                    </div>
                    <div className="grid gap-3 text-white">
                        <div className="grid gap-4">
                          <input
                                type="email"
                                className="rounded-md h-12 px-4 w-full border-0 text-black"
                                placeholder="ഇമെയിൽ"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <p>{errors.email}</p>}
                            <input
                                type="text"
                                className="rounded-md h-12 px-4 w-full border-0 text-black"
                                placeholder="പാസ്സ്‌വേർഡ് "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <p>{errors.password}</p>}
                            <button onClick={loginForm} className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-500 rounded-md p-4 text-white font-bold text-lg transition-all">പ്രവേശിക്കുക </button>
                            {/* <button onClick={reset}>Reset</button> */}
           {message &&  <p className="bg-red-100 text-center rounded-md text-red-600 p-3">{message}</p>}
                    
                        </div>
                    </div>
                    <Link href={''} className="text-sky-400">പാസ്സ്‌വേർഡ് മറന്നോ?</Link>
                </div>
            </div>
        </>
    )
}
