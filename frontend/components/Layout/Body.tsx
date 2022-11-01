import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function Body({ children }: Props) {
    return (
        <div className='h-screen bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url("https://mightymeta.world/static/media/main_kv.5ee4b3493dc7ec423898.jpg")` }}>
            {children}
        </div>
    )
}