'use client'

import { collection, getDocs, query, where } from "firebase/firestore"
import Header from "../../Components/Header"
import { useRouteGuardContext } from "../../Context/RouteGuardContext"
import { db } from "../../firebase/config"
import { useUserContext } from "../../Context/userContext"
import { useEffect, useState } from "react"
import { useTeacherContext } from "../../Context/profileContext"




export default function AttendanceView({ params }) {

    let { month } = params



    //CONTEXT
    const { loading, setLoading } = useRouteGuardContext()
    const { loginUser } = useUserContext()


    //STATES
    const [getAttendance, setGetAttendance] = useState([])
    const [getHolidays, setGetHolidays] = useState([])
    const [profile, setProfile] = useState([])
    const [totalSalary, setTotalSalary] = useState(0)

    //FIREBASE DB
    // const attendanceReportCollectionRef =  collection(db, `attendance-user-${loginUser.uid}-month-${new Date().getMonth() + 1}-year-${new Date().getFullYear()}`, where('month' == 5))





    //PRINT DAYS BY MONTH NUMBER

    const attendanceTable = (holidays) => {



        const getDaysInMonth = function (month, year) {
            return new Date(year, month, 0).getDate();
        };




        //     holidays.map((item) => {
        //    console.log(item)
        //     });

        //console.log(getAttendance)


        const splitDay = ('2024-05-30', '2024-05-31', '2024-05-28', '2024-05-27').split("-")

        function removeLeadingZerosRegex(str) {
            return str.replace(/^0+(?=\d)/, '');
        }


        //WORKING TIME START AND END
        const startTime = 7
        const endTime = 8



        const days = [];

        //for (let i = 0; i < getDaysInMonth(new Date().getMonth() + 1, new Date().getFullYear()); i++) {
        // days.push(
        //     <li className="flex justify-start items-center gap-5">
        //         <span className="bg-sky-400 border border-sky-400 text-white rounded-full p-2 w-10 h-9 flex justify-center">{i+1}</span>
        //         <span className="flex justify-between items-center w-full border-b-gray-100 border-b-2 py-4  text-blue-800 font-semibold">
        //             <span>
        //                 IN 7.02 {i++ == removeLeadingZerosRegex(splitDay[2]) ? 'yes' : 'no'}
        //             </span>
        //             <span>
        //                 OUT 8.35
        //             </span>
        //         </span>
        //     </li>
        // )

        const mergedArray = [...holidays, ...getAttendance];


        days.push(


            (mergedArray).map((item, key) => (

                <>

                    <li className="flex justify-start items-center gap-5" key={key}>

                        {item.reason && <span className="bg-white border-blue-800 border text-blue-800 rounded-full p-2 w-10 h-9 flex justify-center">{item.date.substring(item.date.indexOf("-") + 4)}</span>}
                        {!item.reason ? <span className={startTime < item.punchIn || endTime > item.punchOut ? 'bg-yellow-400 border border-yellow-400 text-white rounded-full p-2 w-10 h-9 flex justify-center' : 'bg-sky-400 border border-sky-400 text-white rounded-full p-2 w-10 h-9 flex justify-center'}>
                            {item.day}
                        </span>
                            :
                            null
                        }
                        {item.reason && <span className="flex justify-between items-center w-full border-b-gray-100 border-b-2 py-4  text-blue-800 font-semibold">
                            <span>
                                HOLIDAY - {item.reason}
                            </span>
                        </span>
                        }

                        {!item.reason ? <span className={startTime < item.punchIn || endTime > item.punchOut ? 'flex justify-between items-center w-full border-b-gray-100 border-b-2 py-4  text-yellow-400 font-semibold' : 'flex justify-between items-center w-full border-b-gray-100 border-b-2 py-4  text-sky-400 font-semibold'}>
                            <span>
                                IN {item.punchIn} {startTime < item.punchIn ? '- LPU' : null}
                            </span>
                            <span>
                                OUT {item.punchOut} {endTime > item.punchOut ? '- EPO' : null}
                            </span>
                        </span>
                            :
                            null
                        }

                        {/* <span className="flex justify-between items-center w-full border-b-gray-100 border-b-2 py-4  text-red-500 font-semibold">
                                        <span>



                                            {item.day}<br/>
                                            {new Date().getDate()-1}<br/>
                                            ABSENT
                                        </span>
                                    </span> */}

                    </li>
                </>
            ))
        )

        return days;

    }





    //DATE MALAYALAM

    function dateMalayalam(date) {

        switch (date) {
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



    useEffect(() => {



        //CALCULATE SALARY

        (async () => {
            try {
               

                    const perDay = await profile[0].salary/30
                    setTotalSalary(perDay)
                
                


            } catch (err) {
                console.log('error')
                console.log(err)
            }
        })();




        //PROFILE
        (async () => {
            try {

                

                const teachersCollectionRef = await query(collection(db, `teachers`),);
               

                const data = await getDocs(query(teachersCollectionRef, where('userId', '==', 'zZfRakIcCBbEkW46oFNp1Xav17r2')))

            
                const filteredData = data.docs.map((doc) => (
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                ))

                setProfile(filteredData)


            } catch (err) {
                console.log('error')
                console.log(err)
            }
        })();


        //HOLIDAYS
        (async () => {
            try {

                const holidaysCollectionRef = await query(collection(db, `holidays-2024-2025`),);

                const data = await getDocs(query(holidaysCollectionRef,))

                //await getDocs(teachersCollectionRef)

                const filteredData = data.docs.map((doc) => (
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                ))

                //filteredData.map((item) => {
                setGetHolidays(filteredData)
                //console.log(item)
                //});



            } catch (err) {
                console.log('error')
                console.log(err)
            }
        })();


        //ATTENDANCE
        (async () => {
            try {
                const attendanceReportCollectionRef = await query(collection(db, `attendance-user-${loginUser.uid}-month-${new Date().getMonth() + 1}-year-${new Date().getFullYear()}`), where('month', '==', 5));

                const data = await getDocs(query(attendanceReportCollectionRef,))

                //await getDocs(teachersCollectionRef)

                const filteredData = data.docs.map((doc) => (
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                ))

                setGetAttendance(filteredData)

            } catch (err) {
                console.log('error')
                console.log(err)
            }
        })();



    }, []);




    //console.log(getAttendance)
    //console.log(getHolidays)


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
                    <div className="bg-white h-screen  px-6 py-5">
                        <Header type="page-header" title={`ഹാജർ പട്ടിക ${dateMalayalam(month)} ${new Date().getFullYear()}`} />
                        <div className="grid items-start px-6 py-5">
                            <ul className="p-0 m-0 number text-sm uppercase">
                                {attendanceTable(getHolidays)}
                            </ul>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-start items-center gap-5 p-4 text-blue-800 font-semibold">
                            <span className="block w-full">
                                ജനുവരി മാസത്തെ ശമ്പളം
                            </span>
                            <span className="number block text-end">
                                ₹{totalSalary} 
                            </span>
                        </div>
                    </div>

                </>

            }
        </>
    )

}
