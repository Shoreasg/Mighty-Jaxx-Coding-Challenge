import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addProducts } from "../../redux/slice/productSlice";

export default function AddProductForm() {
    type Inputs = {
        SKU: string,
        title: string,
        imageURL: string,
    };

    const router = useRouter();
    const dispatch = useAppDispatch();
    const isLoading: boolean = useAppSelector((state) => state.product.loading)

    const onSubmitData: SubmitHandler<Inputs> = data => {
        dispatch(addProducts(data)).then((res: any) => {
            console.log(res.payload)
            if (res.type === 'products/add/fulfilled') {
                toast.success(res.payload.Message)
                router.push("/dashboard")
            }
            else if (res.type === 'products/add/rejected' && res.payload === "Token is not valid!") {
                toast.error("Session expired, Please Relogin")
                router.push("/")
            }
            else if (res.type === 'products/add/rejected') {
                toast.error(res.payload)
            }
          
        })
    }

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    return (<form onSubmit={(e) => e.preventDefault()}>
        <div className="bg-white py-6 rounded-md px-10 max-w-lg shadow-md">
            <h1 className="text-center text-lg font-bold text-gray-500">Add Product</h1>
            <div className="space-y-4 mt-6">
                <div className="w-full flex flex-row justify-center">
                    <input type="text" placeholder="SKU" className="px-4 w-full py-2 bg-gray-50"
                        {...register("SKU", { required: true })} />
                </div>
                {errors.SKU && errors.SKU.type === "required" && (<span className="text-red-500 text-xs italic p-2">
                    This field is required
                </span>)}
                <div className="w-full">
                    <input type="text" placeholder="Title" className="px-4 py-2 w-full  bg-gray-50"
                        {...register("title", { required: true })} />
                </div>
                {errors.title && errors.title.type === "required" && (<span className="text-red-500 text-xs italic p-2">
                    This field is required
                </span>)}
                <div className="w-full">
                    <input type="text" placeholder="imageURL" className="px-4 py-2 w-full  bg-gray-50"
                        {...register("imageURL", { required: true })} />
                </div>
                {errors.imageURL && errors.imageURL.type === "required" && (<span className="text-red-500 text-xs italic p-2">
                    This field is required
                </span>)}
            </div>
            {isLoading? <button disabled className="w-full mt-5 bg-[#3077ff] opacity-25 text-white py-2 rounded-md font-semibold tracking-tight" onClick={handleSubmit(onSubmitData)}>Submit</button>
            :
            <button className="w-full mt-5 bg-[#3077ff] text-white py-2 rounded-md font-semibold tracking-tight" onClick={handleSubmit(onSubmitData)}>Submit</button>}
            
        </div>
    </form>)
}