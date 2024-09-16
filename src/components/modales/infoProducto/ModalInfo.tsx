import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase";
import type { Wine } from "@/pages/interface";
import { useState, useEffect, useCallback, type ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassWater, Grape } from "lucide-react"
import Bandera from "./Banderas";
import useCart from '@/hooks/useCart';

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
  };
}

export default function ModalInfo({ children, elemento }: Readonly<ModalInfoProps>) {
  const [open, setOpen] = useState(false);
  const [vino, setVino] = useState<Wine>();
  const { nombre, variedad } = separarElemento(elemento);

  const fetchData = useCallback(async () => {
    try {
      let { data: variedades, error: errorVariedades } = await supabase
        .from('variedades')
        .select('id')
        .eq('variedad', variedad);

      if (errorVariedades) {
        throw errorVariedades;
      }

      if (!variedades || variedades.length === 0) {
        throw new Error('No se encontró la variedad especificada.');
      }

      let { data: vinos, error: errorVino } = await supabase
        .from('vinos')
        .select("*, variedades(variedad), paises(pais)")
        .eq('nombre', nombre)
        .eq('variedad', variedades[0].id);

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
          <img src={vino?.url_imagen} alt={vino?.nombre} width={400} height={400} />
        </div>
        <div className="w-full flex flex-col justify-between">
          <div className="w-full">
            <div className="grid grid-cols-[80%_1fr]">
              <div className="pt-5">
                <h1 className="text-3xl font-bold text-gray-900">{vino?.nombre}, {vino?.variedades.variedad}</h1>
                <p className="mt-2 text-xl text-gray-500">{vino?.bodega}</p>
              </div>
              <div className="w-16 m-auto">
                {getBandera(vino?.paises.pais ?? "")}
              </div>
            </div>
            <div className="flex justify-between row-start-2 max-h-9 mt-2">
              <div className="space-x-2">
                <Badge variant="secondary" className="px-5 h-7 my-auto">{vino?.paises.pais}</Badge>
                <Badge variant="outline" className="px-5 h-7 my-auto">{vino?.tipo}</Badge>
              </div>
              <div className="flex items-center gap-x-3 h-7 my-auto">
                <div className="flex items-center">
                  <Grape className="w-6 h-6 text-purple-600" />
                  <span className="text-sm text-gray-600">{vino?.variedades.variedad}</span>
                </div>
                <div className="flex items-center">
                  <GlassWater className="w-6 h-6 text-blue-600" />
                  <span className="text-sm text-gray-600">{vino?.nivel_alcohol} % Alcohol</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 row-start-3 border-b mt-3">{vino?.descripcion}</p>
            <p className="text-gray-600 row-start-3 border-b mt-3">{vino?.notas_cata}</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">${vino?.precio} COP</span>
              <span className="ml-2 text-sm text-gray-500">/ botella</span>
            </div>
            <Button size="lg" className="px-8">Añadir al carrito</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}