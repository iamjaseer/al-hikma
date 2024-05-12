
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useRouter } from 'next/navigation'


export default  function SignOutUser() {
  
  const router = useRouter()

  const logout = async () => {
   
    try {
      await signOut(auth)
      console.log('Sign out')
      router.push(`/login`)
      //console.log(auth)
  } catch (err) {
      console.log(err)
  }
  
  }

  return (
      <button onClick={logout} className="py-4 block text-red-400 hover:text-red-600 active:text-red-600 text-xl font-semibold transition-all">
        Logout
      </button>
  )
}