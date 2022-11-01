import Image from 'next/image'

interface ProductListing
{
    SKU: string,
    title: string,
    imageURL: string;

}

export default function ProductCards({ SKU, title, imageURL }: ProductListing) {
    return (
        <div className="w-fit p-2 h-full flex flex-col justify-center bg-slate-800 rounded-lg drop-shadow-md">
            <div className="flex justify-center">
                <Image width={200} height={100} src={imageURL} alt={"NFT image"} />
            </div>
            <div className="pt-2">
                <h1 className="text-sm font-medium text-slate-600 pb-2 text-center">{title}</h1>
                <p className="text-xs tracking-tight text-center font-light text-slate-400 leading-6">{SKU}</p>
            </div>
        </div>
    )
}