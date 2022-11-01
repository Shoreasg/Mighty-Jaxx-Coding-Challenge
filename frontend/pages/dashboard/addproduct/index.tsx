import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import AddProductForm from "../../../components/Form/AddProductForm";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { checkUser } from "../../../redux/slice/authSlice";

export default function AddProduct() {
    const dispatch = useAppDispatch();
    const router = useRouter();


    useEffect(() => {
        const token: string = localStorage.getItem('userToken') ?? '';
        dispatch(checkUser({ jwtToken: token })).then((res: any) => {
          if (res.type === "auth/checkUser/fulfilled") {
            router.push('/dashboard/addproduct')
          }
          else if (res.type === 'auth/checkUser/rejected"') {
            toast.error(res.payload)
            router.push("/")
    
          }
        })
    
      }, [])
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <AddProductForm />
        </div>
    )
}