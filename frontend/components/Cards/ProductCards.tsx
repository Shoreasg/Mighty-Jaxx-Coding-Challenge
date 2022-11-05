import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { deleteProducts, editProducts, getProducts } from '../../redux/slice/productSlice';
import { ProductData } from '../../types';

export default function ProductCards({ SKU, title, imageURL }: ProductData) {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleDeleteButton: any = () => { //when user click on delete button, ask user if they want to delete
        Swal.fire({
            title: 'Are you sure you want to delete this product?',
            showCancelButton: true,
            confirmButtonText: "Confirm",
            icon: 'warning',
            preConfirm: () => {
                dispatch(deleteProducts(SKU)).then((res: any) => { //if yes, delete successful toast shown, update products listing on dashboard
                    if (res.type === 'products/delete/fulfilled') {
                        toast.success(res.payload.Message)
                        dispatch(getProducts())
                    }
                    else if (res.type === 'products/delete/rejected' && res.payload === "Token is not valid!") { //if token expired when they delete, do nothing and redirect user back to login page
                        toast.error("Session expired, Please Relogin")
                        router.push("/")
                    }
                    else if (res.type === 'products/delete/rejected') { //else if token not expired, tell user why delete failed
                        toast.error(res.payload)
                    }
                })
            }
        })
    };


    const handleEditButton: any = () => { // when user click on edit button, ask user the new details
        Swal.fire({
            title: 'Enter the following details to edit product',
            showCancelButton: true,
            confirmButtonText: "Edit Product",
            icon: 'info',
            html: `<input value="${SKU}" id="SKU" type="text" class="swal2-input">` +
                `<input value="${title}" id="title" type="text" class="swal2-input">` +
                `<input value="${imageURL}" id="image URL" type="text" class="swal2-input">`,
            preConfirm: () => {
                const newSKU: string = (document.getElementById('SKU') as HTMLInputElement).value;
                const newtitle: string = (document.getElementById('title') as HTMLInputElement).value;
                const newimageURL: string = (document.getElementById('imageURL') as HTMLInputElement).value;
                dispatch(editProducts({ newSKU, newtitle, newimageURL, SKU })).then((res: any) => { //if user provided valid details
                    if (res.type === 'products/edit/fulfilled') { //edit successful, send toast success, update products listing
                        toast.success(res.payload.Message)
                        dispatch(getProducts())
                    }
                    else if (res.type === 'products/edit/rejected' && res.payload === "Token is not valid!") { //if token expired while user edit, redirect him to login page and do nothing
                        toast.error("Session expired, Please Relogin")
                        router.push("/")
                    }
                    else if (res.type === 'products/edit/rejected') { //if token not expired, tell user why edit failed
                        toast.error(res.payload)
                    }
                })
            }
        })
    };

    return (
        <div className="w-full p-2 h-full flex flex-col justify-center bg-slate-800 rounded-lg drop-shadow-md">
            <div className="flex justify-center h-3/4">
                <Image width={200} height={100} src={imageURL} alt={"NFT image"} />
            </div>
            <div className="pt-2">
                <h1 className="text-sm font-extrabold text-white pb-2 text-center ">Title: {title}</h1>
                <p className="text-xs tracking-tight text-center font-light text-white leading-6">SKU: {SKU}</p>
            </div>
            <div className='flex flex-row justify-center space-x-2 mt-2'>
                <button
                    type="button"
                    onClick={handleEditButton}
                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-1 py-1  text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={handleDeleteButton}
                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-1 py-1 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}