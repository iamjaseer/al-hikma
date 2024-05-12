'use client'

import Header from "../../Components/Header"
import { useRouteGuardContext } from "../../Context/RouteGuardContext"


export default function AttendanceView({params}) {

  let { month } = params


   //CONTEXT
   const { loading, setLoading } = useRouteGuardContext()

   //DATE MALAYALAM

   function dateMalayalam(date) {


    //const month = date.replace(/-/g, "").slice(4, 6).replace(/^0+/, '');


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



  return  (
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
               <div className="bg-white  px-6 py-5">
    <Header type="page-header" title={`ഹാജർ പട്ടിക ${dateMalayalam(month)} ${new Date().getFullYear()}`} />
<div className="h-screen grid items-start px-6 py-5">



       <ul className="p-0 m-0 number text-sm uppercase">
        <li  className="flex justify-start items-center gap-5">
          <span className="bg-sky-400 border border-sky-400 text-white rounded-full p-2 w-10 h-9 flex justify-center">1</span>
          <span className="flex justify-between items-center w-full border-b-gray-100 border-b-2 py-4  text-blue-800 font-semibold">
            <span>
            IN 7.02
            </span>
            <span>
            OUT 8.35
            </span>
          </span>
          </li>
          <li  className="flex justify-start items-center gap-5">
          <span className="bg-white border-sky-400 border text-sky-400 rounded-full p-2 w-10 h-9 flex justify-center">1</span>
          <span className="flex justify-between items-center w-full border-b-gray-100 border-b-2 py-4  text-blue-800 font-semibold">
            <span>
            HOLIDAY - Holiday Name
            </span>
          </span>
          </li>
          <li  className="flex justify-start items-center gap-5">
          <span className="border-red-500 border bg-red-500 text-white rounded-full p-2 w-10 h-9 flex justify-center">1</span>
          <span className="flex justify-between items-center w-full border-b-gray-100 border-b-2 py-4  text-red-500 font-semibold">
            <span>
            ABSENT
            </span>
          </span>
          </li>
          <li  className="flex justify-start items-center gap-5">
          <span className="bg-yellow-400 border border-yellow-400 text-white rounded-full p-2 w-10 h-9 flex justify-center">1</span>
          <span className="flex justify-between items-center w-full border-b-gray-100 border-b-2 py-4  text-yellow-400 font-semibold">
            <span>
            IN 7.02
            </span>
            <span>
            OUT 8.35 - EPO
            </span>
          </span>
          </li>
       </ul>
    </div>
    <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-start items-center gap-5 p-4 text-blue-800 font-semibold">
      <span className="block w-full">
      ജനുവരി മാസത്തെ ശമ്പളം 
      </span>
      <span className="number block text-end">
      ₹3867
      </span>
    </div>
</div>

            </>

        }
    </>
)

}
