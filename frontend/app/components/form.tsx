'use client';
import { useForm, SubmitHandler } from "react-hook-form";

export default function Form() {
    type Inputs = {
        Email: string,
        Password: string,
    };

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmitData: SubmitHandler<Inputs> = data => console.log(data);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="bg-white py-6 rounded-md px-10 max-w-lg shadow-md">
                <h1 className="text-center text-lg font-bold text-gray-500">Welcome to Mighty Meta Admin Dashboard!</h1>
                <div className="space-y-4 mt-6">
                    <div className="w-full flex flex-row justify-center">
                        <input type="text" placeholder="Email" className="px-4 w-full py-2 bg-gray-50"
                            {...register("Email", { required: true })} />
                    </div>
                    {errors.Email && errors.Email.type === "required" && (<span className="text-red-500 text-xs italic p-2">
                        This field is required
                    </span>)}
                    <div className="w-full">
                        <input type="text" placeholder="Password" className="px-4 py-2 w-full  bg-gray-50"
                            {...register("Password", { required: true })} />
                    </div>
                </div>
                <button className="w-full mt-5 bg-[#3077ff] text-white py-2 rounded-md font-semibold tracking-tight" onClick={handleSubmit(onSubmitData)}>Login</button>
            </div>
        </form>
    )
}