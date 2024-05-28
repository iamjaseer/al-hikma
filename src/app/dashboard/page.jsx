'use client'
import Header from "../Components/Header"
import Punching from "../Components/Punching"
import { useUserContext } from "../Context/userContext";
import { useEffect, useState } from "react";
import { db } from "../firebase/config"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useRouteGuardContext } from "../Context/RouteGuardContext";
import Link from "next/link";
import { useProfileContext } from "../Context/profileContext";



export default function AdminDashboard() {



  //CONTEXT
  const { loginUser } = useUserContext()
  const { profile} = useProfileContext()

  const { loading, setLoading } = useRouteGuardContext()

  //FIREBASE DB
  const teachersCollectionRef = collection(db, "teachers",)
  const leaveCollectionRef = collection(db, "leave",)


  //STATES
  // const [profile, setProfile] = useState()
  const [userData, setUserData] = useState('')
  const [leave, setLeave] = useState([])





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


    //USER PROFILE DATA BY LOGINED USER ID
    // const getProfile = async () => {
    //   try {

    //     const data = await getDocs(query(teachersCollectionRef, where('userId', '==', loginUser.uid)))

    //     const filteredData = data.docs.map((doc) => (
    //       {
    //         ...doc.data(),
    //         id: doc.id
    //       }
    //     ))
    //     setProfile(filteredData)

        
    //     //setLoading(false)



    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // }


    //GT ALL leave
    const getLeaveList = async () => {

      try {

          
        const data = await getDocs(query(leaveCollectionRef, where('status', '==', 'pending')))

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




  
    getLeaveList()
    activeUser()

  }, [loginUser]);



console.log(profile)

  //TESTING
//console.log(userInfoStatus)

  return (
    <>
{profile}
fsdf
      {!loading && <div className="h-screen flex items-center justify-center" role="status">
        <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-sky-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>}
      {loading &&
        <div className="bg-white-custom bg-primary h-screen px-6 py-5">
          <Header type="normal" />
          <div className="welcome my-6 grid gap-1">
            <h1 className="text-3xl font-bold text-blue-800">സ്വാഗതം,</h1>
            <p className="text-xl text-blue-800">{profile && profile[0].name}</p>
          </div>
          {/* ==================== IF USER ADMIN ======================= */}
          {userData == 'jaseerali2012@gmail.com' ?
            <div className="h-screen pt-6 items-center justify-center">
            <Link href={'/leave'}  className="bg-white rounded-xl p-6 flex justify-between items-center gap-4 w-full text-blue-800">
                <p className="text-xl m-0 pt-2 pl-3 font-semibold">ലീവ് അപ്ലിക്കേഷൻ </p>
                <span className="bg-sky-50 text-sky-500 rounded-full items-center  w-10 h-10 flex justify-center font-semibold number">{leave.length}</span>
              </Link>
              <h6 className="text-xl  font-semibold text-blue-800 my-5">ഇന്നത്തെ ഹാജർ  </h6>
              <div className="grid gap-5">
                <div className="bg-white rounded-xl p-6 pb-3 justify-between items-center w-full text-blue-800">
                  <p>മുഹമ്മദ് </p>
                  <div className="flex justify-between items-center w-100 pt-0">
                    <p className="text-lg m-0 font-semibold">IN 7.00 OUT 8.00</p>
                    <span className="bg-green-50 text-green-500 rounded-full items-center px-4 py-2 flex justify-center font-semibold number mb-3">കൃത്യ സമയം </span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 pb-3 justify-between items-center w-full text-blue-800">
                  <p>മുഹമ്മദ് </p>
                  <div className="flex justify-between items-center w-100 pt-0">
                    <p className="text-lg m-0 font-semibold">IN 7.00 OUT 8.00</p>
                    <span className="bg-yellow-50 text-yellow-500 rounded-full items-center px-4 py-2 flex justify-center font-semibold number mb-3">20 മിനിറ്റ് വൈകി</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 pb-3 justify-between items-center w-full text-blue-800">
                  <p>മുഹമ്മദ് </p>
                  <div className="flex justify-between items-center w-100 pt-0">
                    <p className="text-lg m-0 font-semibold">IN 7.00 OUT 8.00</p>
                    <span className="bg-red-50 text-red-500 rounded-full items-center px-4 py-2 flex justify-center font-semibold number mb-3">ലീവ് </span>
                  </div>
                </div>
              </div>
            </div>
            :
            /* ==================== IF USER PUBLIC (TEACHERS) ======================= */
           <div className="h-screen items-center grid">
             <Punching user={loginUser.uid} />
           </div>
          }
        </div>

      }
    </>
  )
}
