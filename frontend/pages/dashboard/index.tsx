import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks"
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { checkUser } from "../redux/slice/authSlice";
import { toast } from 'react-toastify';
export default function Dashboard() {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading: boolean = useAppSelector((state) => state.user.loading)
  useEffect(() => {
    const token: string = localStorage.getItem('userToken') ?? '';
    dispatch(checkUser({ jwtToken: token })).then((res: any) => {
      if (res.type === "auth/checkUser/fulfilled") {
        router.push('/dashboard')
      }
      else if (res.type === "auth/checkUser/rejected") {
        toast.error(res.payload)
        router.push("/")
      }
    })

  }, [])

  return (
    <>
      {isLoading ? null : <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-white">this is dashboard</h1>
      </div>}
    </>

  )
}
