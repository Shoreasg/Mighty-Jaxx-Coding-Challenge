import Image from 'next/image'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks'
import { logout } from '../../redux/slice/authSlice';
import { filter, clear } from '../../redux/slice/productSlice';


export default function Header() {


    const userInfo: string = useAppSelector((state) => state.user.userInfo);
    const searchValue: string = useAppSelector((state) => state.product.filterValue)
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => { //handle logout, clear jwt token in local storage, reset all states, redirect user to login page
        dispatch(logout());
        dispatch(clear());
        toast.success("Log out successfully")
        router.push("/")
    };


    return (
        <header className="bg-[#3077ff] grid grid-cols-3">
            <div className='flex flex-row justify-start'>
                    <Image
                        src="data:image/png;base64,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"
                        alt="MightyMeta Logo"
                        width={150}
                        height={150}
                        className="p-4" />
            </div>
            {userInfo ?
                <>
                    <div className='flex flex-row items-center justify-center'>
                        <input
                            onChange={(e) => dispatch(filter(e.target.value))}
                            value={searchValue}
                            placeholder="Search by title"
                            className="px-2 py-3 w-full flex items-center bg-gray-50 text-center" />
                    </div>
                    <div className='flex justify-end p-4'>
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </> : null}
        </header>
    )
}