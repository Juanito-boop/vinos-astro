import ModalMenu from "@/components/modales/menu/ModalMenu";
import { Phone } from 'lucide-react';
import { useEffect } from "react";

export default function MainHeaderReact() {
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("selectedItems_variedades")) {
      localStorage.setItem("selectedItems_variedades", JSON.stringify([]));
    }
  }, []);
  
  return (
    <header className="mx-2.5 mb-3 w-auto rounded-b-xl bg-magenta-500 grid grid-flow-col grid-cols-[20%_1fr_20%]">
      <a href="/vinos-astro/" className="inline-block p-3 rounded-md col-span-1 mx-auto" aria-label="Home">
        <img
          src="https://npuxpuelimayqrsmzqur.supabase.co/storage/v1/object/public/images/some/image-removebg-preview.svg"
          alt="Logo"
          width={120}
          height={120}
          loading="eager"
        />
      </a>

      <div className="w-auto my-auto flex flex-row justify-between text-[#fdcd57]">
        <div className="text-start">
          <div className="text-4xl font-bold">LOS VINOS</div>
          <div className="text-xl font-semibold">Wine Bar</div>
        </div>
        <div className="text-end">
          <div className="text-lg font-semibold">Villa de Leyva, Carrera 9 #11-47 Segundo piso</div>
          <div className="flex items-center gap-2 justify-end">
            <p className="text-lg font-bold">CONTACTANOS</p>
            <Phone />
            <p className="text-lg font-bold">(+57) 3219085857</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center col-span-3 mx-auto">
        <ModalMenu />
      </div>
    </header>
  )
}