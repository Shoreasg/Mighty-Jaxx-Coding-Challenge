import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { loginUser } from "../../redux/slice/authSlice";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { FormData } from "../../types";

export default function Form() {

     const { register, handleSubmit, formState: { errors } } = useForm<FormData>(); //use react hook form to handle the form login
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isLoading: boolean = useAppSelector((state) => state.user.loading)

    const onSubmitData: SubmitHandler<FormData> = data => {
        dispatch(loginUser(data)).then((res: any) => {
            if (res.type === 'auth/login/fulfilled') { //when user enter details, call login api, if success, tell user login success, redirect user to dashboard
                toast.success("Login successful")
                router.push('/dashboard')
            }
            else if (res.type === 'auth/login/rejected') { // else tell user why login failed
                toast.error(res.payload)
            }
        })
    };

    return (
        <>
            {isLoading ?
                <div className="bg-white py-6 rounded-md px-10 max-w-lg shadow-md animate-pulse">
                    <h1 className="text-center text-lg font-bold text-gray-500">Loading</h1>
                </div>
                : <form onSubmit={(e) => e.preventDefault()}>
                    <div className="bg-white py-6 rounded-md px-10 max-w-lg shadow-md">
                        <h1 className="text-center text-lg font-bold text-gray-500">Welcome to Mighty Meta Admin Dashboard!</h1>
                        <div className="space-y-4 mt-6">
                            <div className="w-full flex flex-row justify-center">
                                <input type="email" placeholder="Email" className="px-4 w-full py-2 bg-gray-50"
                                    {...register("email", { required: true, pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid Email" } })} />
                            </div>
                            {errors.email && errors.email.type === "required" && (<span className="text-red-500 text-xs italic p-2">
                                This field is required
                            </span>)}
                            {errors.email && errors.email.type === "pattern" && (<span className="text-red-500 text-xs italic p-2">
                                {errors.email.message}
                            </span>)}
                            <div className="w-full">
                                <input type="password" placeholder="Password" className="px-4 py-2 w-full  bg-gray-50"
                                    {...register("password", { required: true,minLength: 6 })} />
                            </div>
                            {errors.password && errors.password.type === "required" && (<span className="text-red-500 text-xs italic p-2">
                                This field is required
                            </span>)}
                            {errors.password && errors.password.type === "minLength" && (<span className="text-red-500 text-xs italic p-2">
                                Password minimum 6 characters
                            </span>)}
                        </div>
                        <button className="w-full mt-5 bg-[#3077ff] text-white py-2 rounded-md font-semibold tracking-tight" onClick={handleSubmit(onSubmitData)}>Login</button>
                    </div>
                </form>}
        </>
    )
}
