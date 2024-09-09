import ModalMenu from "@/components/modales/menu/ModalMenu";
import { useEffect } from "react";

export default function MainHeaderReact() {
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("selectedItems_variedades")) {
      localStorage.setItem("selectedItems_variedades", JSON.stringify([]));
    }
  }, []);
  
  return (
    <header className="z-0 mx-2.5 mb-3 w-auto rounded-b-xl bg-magenta-500 py-3">
      <div className="grid grid-flow-col grid-cols-[20%,1fr,20%] items-center">
        <a href="/vinos-astro/" className="inline-block p-3 rounded-md col-span-1 mx-auto" aria-label="Home">
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
          <div className="text-2xl font-semibold text-center text-black">Villa de Leyva, Carrera 9 #11-47 Segundo piso</div>
          <div className="inline-flex h-[26px] items-center justify-center self-stretch mx-auto">
            <div className="flex flex-row gap-2 p-2 text-center text-black">
              <p className="text-lg font-bold">CONTACTANOS (+57) 3219085857</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 my-auto">
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-center col-span-3 mx-auto">
          <ModalMenu />
        </div>
      </div>
    </header>
  )
}