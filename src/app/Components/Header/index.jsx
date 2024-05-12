


'use client'
import Link from "next/link"
import { BrandName } from "../Brand"
import { useRouter } from 'next/navigation'
//import SignOut from "../sign-out"
import SignOutUser from '../Signout'
import { useEffect, useState } from "react";
import { useUserContext } from "../../Context/userContext"


export default function Header({ type, title }) {

    const router = useRouter()

    //CONTEXT
    const { loginUser } = useUserContext()

    //STATES
    const [nav, setNav] = useState(false)
    const [userData, setUserData] = useState('')


    useEffect(() => {
        //LOGIN USER
        const activeUser = async () => {
            try {
                const result = await loginUser.email;
                setUserData(result);

                //console.log(result)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        activeUser()
    }, [loginUser]);


    const mainNav = <div className={`${nav == false ? 'hidden' : 'block'} menubar fixed top-0 left-0 bottom-0 right-0 bg-primary p-5`}>
        <div className="flex justify-between items-center">
            <small className="text-white">{BrandName}</small>
            <button className="btn-menue-close border-0 p-5 bg-no-repeat bg-center" onClick={() => setNav(!nav)}></button>
        </div>
        <div className="mt-5">
            <Link href={'/'} onClick={() => setNav(!nav)} className="py-4 block  text-white hover:text-sky-500 active:text-sky-500 text-xl font-semibold transition-all">ഹോം</Link>
            <Link href={'/attendance-report'} onClick={() => setNav(!nav)} className="py-4 block text-white hover:text-sky-500 active:text-sky-500 text-xl font-semibold transition-all">ഹാജർ പട്ടിക </Link>
            <Link href={'/leave'} onClick={() => setNav(!nav)} className="py-4 block text-white hover:text-sky-500 active:text-sky-500 text-xl font-semibold transition-all">ലീവ് അപ്ലിക്കേഷൻ </Link>
            <Link href={'/calendar'} onClick={() => setNav(!nav)} className="py-4 block text-white hover:text-sky-500 active:text-sky-500 text-xl font-semibold transition-all">കലണ്ടർ</Link>
            {userData == 'jaseerali2012@gmail.com' ? <Link href={'/all-teachers'} onClick={() => setNav(!nav)} className="py-4 block text-white hover:text-sky-500 active:text-sky-500 text-xl font-semibold transition-all">അദ്ധ്യാപകർ </Link> : ''}
            <Link href={'/reset-password'} onClick={() => setNav(!nav)} className="py-4 block text-white hover:text-sky-500 active:text-sky-500 text-xl font-semibold transition-all">പാസ്സ്‌വേർഡ് മാറ്റുക</Link>
            <SignOutUser />
        </div>
    </div>


    switch (type) {
        case 'normal':
            return <>
                <header className="flex justify-between items-center">
                    <small className="text-black">{BrandName}</small>
                    <button className="btn-menue border-0 p-5 bg-no-repeat bg-center" onClick={() => setNav(!nav)}></button>
                </header>
                {mainNav}
            </>
            break;
        case 'page-header':
            return <>
                <header className="flex justify-start items-center gap-4">
                    <button onClick={router.back} className="p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                            <path fill="#1C208F" fill-rule="evenodd" d="M9.935 1.44a.437.437 0 0 1 0 .62L4.994 7l4.94 4.94a.438.438 0 1 1-.619.62l-5.25-5.25a.437.437 0 0 1 0-.62l5.25-5.25a.437.437 0 0 1 .62 0Z" clip-rule="evenodd" />
                        </svg>

                    </button>
                    <p className="text-xl text-blue-800 font-semibold">{title}</p>
                </header>
                {mainNav}
            </>
            break;

    }



}
