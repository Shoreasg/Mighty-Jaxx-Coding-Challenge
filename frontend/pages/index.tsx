import Form from '../components/Form/Form'
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks/hooks';
import { useRouter } from 'next/router';
import { checkUser } from '../redux/slice/authSlice';
import { toast } from 'react-toastify';
export default function Home() {


  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token: string = localStorage.getItem('userToken') ?? '';
    dispatch(checkUser({ jwtToken: token })).then((res: any) => { //when reach login page, check if user token is still valid, yes? redirect user to dashboard, else stay at login page
      if (res.type === "auth/checkUser/fulfilled") {
        router.push('/dashboard')
      }
      else if (res.type === 'auth/checkUser/rejected"') {
        toast.error(res.payload)
        router.push("/")
      }
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Form />
    </div>
  )
}
