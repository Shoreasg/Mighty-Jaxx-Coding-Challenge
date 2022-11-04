import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks"
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { checkUser } from "../../redux/slice/authSlice";
import { toast } from 'react-toastify';
import { addProducts, clear, getProducts } from "../../redux/slice/productSlice";
import ProductCards from "../../components/Cards/ProductCards";
import Swal from "sweetalert2";


export default function Dashboard() {

  interface ProductListing {
    SKU: string,
    title: string,
    imageURL: string;

  }

  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading: boolean = useAppSelector((state) => state.user.loading);
  const userInfo: string = useAppSelector((state)=> state.user.userInfo);
  const isProductLoading: boolean = useAppSelector((state) => state.product.loading);
  const productInfo: any = useAppSelector((state) => state.product.productInfo);
  const filterValue: string = useAppSelector((state) => state.product.filterValue);
  useEffect(() => {
    const token: string = localStorage.getItem('userToken') ?? '';
    dispatch(checkUser({ jwtToken: token })).then((res: any) => {
      if (res.type === "auth/checkUser/fulfilled") {
        router.push('/dashboard')
      }
      else if (res.type === "auth/checkUser/rejected") {
        toast.error(res.payload);
        router.push("/")
      }
    })
    dispatch(getProducts());
  }, [])


  const handleAddButton: any = () => {
    Swal.fire({
      title: 'Enter the following details to add new product',
      showCancelButton: true,
      confirmButtonText: "Add Product",
      icon: 'info',
      html: '<input id="SKU" type="text" placeholder="SKU" class="swal2-input">' +
        '<input type="text" placeholder="title" id="title" class="swal2-input">' +
        '<input type="text" placeholder="image URL" id="imageURL" class="swal2-input">',
      preConfirm: () => {
        const SKU: string = (document.getElementById('SKU') as HTMLInputElement).value;
        const title: string = (document.getElementById('title') as HTMLInputElement).value;
        const imageURL: string = (document.getElementById('imageURL') as HTMLInputElement).value;
        dispatch(addProducts({ SKU: SKU, title: title, imageURL: imageURL })).then((res: any) => {
          if (res.type === 'products/add/fulfilled') {
            toast.success(res.payload.Message)
            dispatch(getProducts())
          }
          else if (res.type === 'products/add/rejected' && res.payload === "Token is not valid!") {
            toast.error("Session expired, Please Relogin")
            dispatch(clear());
            router.push("/")
          }
          else if (res.type === 'products/add/rejected') {
            toast.error(res.payload)
          }

        })
      }

    })
  }


  const mapProductsInfo = [...productInfo].sort((a: ProductListing, b: ProductListing) => (a.SKU < b.SKU) ? -1 : 1).filter((product: ProductListing) => filterValue ? product.title.toLowerCase().includes(filterValue.toLowerCase()) : true)
    .map((product: ProductListing, key: number) => (<ProductCards key={key} SKU={product.SKU} title={product.title} imageURL={product.imageURL} />));
  // sort by sku, filter if user search, map the proudcts accordingly.

  return (
    <>
      {isLoading || isProductLoading ? <div className="flex flex-col items-center justify-center h-screen">
        <div className="divide-y pt-2 divide-gray-200 overflow-y-scroll w-3/4 h-3/4 rounded-lg bg-white shadow animate-pulse flex flex-col justify-center">
          <h1 className="text-center text-lg font-bold text-gray-500">Loading</h1>
        </div>
      </div> :
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-xl font-bold mb-2 text-white pb-2 text-center">Welcome: {userInfo.split('@')[0]}</h1>
          <div className="divide-y pt-2 divide-gray-200 overflow-y-scroll w-3/4 h-3/4 rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6 flex flex-row justify-between">
              <div className="text-3xl font-bold leading-tight tracking-tight text-gray-900">List of Products</div>
              <button
                type="button"
                onClick={handleAddButton}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Product
              </button>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-2 m-2">
              {mapProductsInfo}
            </div>
          </div>
        </div>
      }
    </>
  )
}
