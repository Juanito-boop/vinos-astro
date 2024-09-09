import { useEffect } from "react";
import ModalMenu from "../modales/menu/ModalMenu";

export default function InfoHeader() {
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("selectedItems_variedades")) {
      localStorage.setItem("selectedItems_variedades", JSON.stringify([]));
    }
  }, []);
  return(
    <header className="z-0 mx-2.5 mb-3 rounded-b-xl bg-magenta-500 py-3">
      <div className="grid grid-flow-col grid-cols-[20%,1fr,20%] items-center">
        <a href="/" className="inline-block rounded-md col-span-1 mx-auto" aria-label="Home">
          <img
            src="https://npuxpuelimayqrsmzqur.supabase.co/storage/v1/object/public/images/some/image-removebg-preview.svg"
            alt="Logo"
            width={120}
            height={120}
            loading="eager"
          />
        </a>

        <div className="inline-flex flex-col items-center justify-center w-auto h-auto">
          <div className="text-center text-[40px] font-semibold text-black">LOS VINOS</div>
          <div className="text-2xl font-semibold text-center text-black">Wine Bar</div>
        </div>

        <div className='flex justify-center col-span-3 mx-auto'>
          <ModalMenu />
        </div>
      </div>
    </header>
  )
}