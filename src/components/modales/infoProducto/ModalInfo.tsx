import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import type { Wine } from "@/pages/interface";
import { GlassWater, Grape } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import Bandera from "./Banderas";

interface ModalInfoProps {
  children: ReactNode;
  elemento: string;
  key?: number
}

const banderas: { [key: string]: () => JSX.Element | null } = {
  Argentina: () => <Bandera pais="Argentina" />,
  Chile: () => <Bandera pais="Chile" />,
  Colombia: () => <Bandera pais="Colombia" />,
  España: () => <Bandera pais="España" />,
  Francia: () => <Bandera pais="Francia" />,
  Italia: () => <Bandera pais="Italia" />,
};

const getBandera = (banderaName: string | undefined) => {
  const bandera = banderas[banderaName ?? ''];
  return bandera ? bandera() : null;
};

function separarElemento(elemento: string) {
  const [nombre, variedad] = elemento.split('~');

  return {
    nombre: nombre.replace(/-/g, ' '),
    variedad: variedad.replace(/-/g, ' ')
    // variedad: variedad.split(',').map(variedad => variedad.replace(/-/g, ' '))
  };
}

export default function ModalInfo({ children, elemento }: Readonly<ModalInfoProps>) {
  const [open, setOpen] = useState(false);
  const [vino, setVino] = useState<Wine>();
  const { nombre, variedad } = separarElemento(elemento);;

  const fetchData = useCallback(async () => {
    try {

      let { data: vinos, error: errorVino } = await supabase
        .from('wines')
        .select("*")
        .eq('nombre', nombre)
        .containedBy('variedades', [variedad]);
      if (errorVino) {
        throw errorVino;
      }

      if (!vinos || vinos.length === 0) {
        throw new Error('No se encontró el vino con el nombre y variedad especificados.');
      }

      const fetched = vinos[0] as Wine;
      setVino(fetched);
    } catch (error) {
      console.error('Error al obtener la información:', error);
    }
  }, [nombre, variedad]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex-shrink-0 max-w-[32%]">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[80%] max-h-[80%] min-h-[60%] flex flex-row">
        <div className="flex-shrink-0 max-w-[40%]">
          <img src={vino?.url_imagen} alt={vino?.id_vino} width={400} height={400} />
        </div>
        <div className="w-full flex flex-col justify-between">
          <div className="w-full">
            <div className="grid grid-cols-[80%_1fr]">
              <div className="pt-5">
                <h1 className="text-3xl font-bold text-gray-900">{vino?.nombre}, {vino?.variedades}</h1>
                <p className="mt-2 text-xl text-gray-500">Bodegas {vino?.bodega}</p>
              </div>
              <div className="w-16 m-auto border border-black">
                <picture>
                  <img 
                  src={`https://npuxpuelimayqrsmzqur.supabase.co/storage/v1/object/public/paises/${
                    vino?.pais_importacion.replace(/ñ/g, 'n')
                  }.svg?t=2024-09-29T21%3A16%3A34.164Z`} 
                  alt={`Bandera de ${vino?.pais_importacion}`} />
                </picture>
              </div>
            </div>
            <div className="flex justify-between row-start-2 mt-1">
              <div className="flex flex-col gap-y-2">
                <div className="space-x-2">
                  <Badge variant="secondary" className="px-4 h-6">{vino?.pais_importacion}</Badge>
                  <Badge variant="outline" className="px-4 h-6">{vino?.tipo_crianza}</Badge>
                  <Badge variant="outline" className="px-4 h-6">{vino?.contenido_azucar}</Badge>
                </div>
                <div className="space-x-2">
                  <Badge variant="outline" className="px-4 h-6">{vino?.color_vino}</Badge>
                  <Badge variant="outline" className="px-4 h-6">{vino?.contenido_carbonico}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-x-3 h-7 mb-auto">
                <div className="flex items-center">
                  <Grape className="w-6 h-6 text-purple-600" />
                  <span className="text-sm text-gray-600">{vino?.variedades.join(' | ')}</span>
                </div>
                <div className="flex items-center">
                  <GlassWater className="w-6 h-6 text-blue-600" />
                  <span className="text-sm text-gray-600">{vino?.nivel_alcohol} % Alcohol</span>
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-gray-600 row-start-3 border-b mt-3">{vino?.descripcion}</p>
              <p className="text-gray-600 row-start-3 border-b mt-3">{vino?.notas_cata}</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-end pb-5">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">${vino?.precio} COP</span>
              <span className="ml-2 text-xl text-gray-500">/ botella</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}