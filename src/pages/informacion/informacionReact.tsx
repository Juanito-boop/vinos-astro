import type { Wine } from "../interface";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase";
import { GlassWater, Grape } from "lucide-react"
import { useCallback, useEffect, useState } from "react";

const banderas: { [key: string]: () => JSX.Element | null } = {
  Argentina: () => <picture>
    <img src="/vinos-astro/Argentina.svg" alt="Bandera Argentina" />
  </picture>,
  Chile: () => <picture>
    <img src="/vinos-astro/Chile.svg" alt="Bandera Chile" />
  </picture>,
  Colombia: () => <picture>
    <img src="/vinos-astro/Colombia.svg" alt="Bandera Colombia" />
  </picture>,
  España: () => <picture>
    <img src="/vinos-astro/España.svg" alt="Bandera España" />
  </picture>,
  Francia: () => <picture>
    <img src="/vinos-astro/Francia.svg" alt="Bandera Francia" />
  </picture>,
  Italia: () => <picture>
    <img src="/vinos-astro/Italia.svg" alt="Bandera Italia" />
  </picture>,
};

const getBandera = (banderaName: string) => {
  const bandera = banderas[banderaName];
  return bandera ? bandera() : null;
};

export default function InformacionReact({ nombre, variedad }: Readonly<{ nombre: string, variedad: string }>) {
  const [vino, setVino] = useState<Wine>();
  console.log(vino);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Obtener la id de la variedad
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

      // Obtener información del vino
      let { data: vinos, error: errorVino } = await supabase
        .from('vinos')
        .select("*, variedades(variedad), paises(pais)")
        .eq('nombre', nombre)
        .eq('variedad', variedades[0].id); // Utilizamos directamente la id de la variedad

      if (errorVino) {
        throw errorVino;
      }

      if (!vinos || vinos.length === 0) {
        throw new Error('No se encontró el vino con el nombre y variedad especificados.');
      }

      // Establecer el primer vino obtenido
      const fetched = vinos[0] as Wine;
      setVino(fetched);
    } catch (error) {
      console.error('Error al obtener la información:', error);
      setError('No se pudo obtener la información del vino.');
    } finally {
      setLoading(false);
    }
  }, [nombre, variedad]);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="mx-2.5 bg-normalColor11 rounded-xl p-3 text-center">Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!vino) {
    return <div>No se encontró el vino.</div>;
  }

  return (
    <main className="mx-2.5 bg-normalColor11 rounded-xl px-1 py-2">
      <div className="container mx-auto py-3 px-0">
        <div className="md:flex overflow-hidden">
          <div className="md:flex-shrink-0 bg-gray-200 rounded-l-xl py-5">
            <picture>
              <img
                src={vino.url_imagen}
                alt={vino.nombre}
                width={500}
                height={500}
                className="h-full w-full object-cover md:w-96"
              />
            </picture>
          </div>
          <div className="p-8 w-full bg-white rounded-r-xl grid grid-flow-row grid-rows-[1fr, 20%]">
            <div className="flex justify-between items-start row-start-1">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{vino.nombre}</h1>
                <p className="mt-2 text-xl text-gray-500">{vino.bodega}</p>
              </div>
              <div className="flex items-center w-20 border border-black my-auto">
                {getBandera(vino.paises.pais)}
              </div>
            </div>
            <div className="flex justify-between row-start-2 max-h-9">
              <div className="space-x-2">
                <Badge variant="secondary" className="px-5 h-7 my-auto">{vino.paises.pais}</Badge>
                <Badge variant="outline" className="px-5 h-7 my-auto">{vino.tipo}</Badge>
              </div>
              <div className="flex items-center gap-x-3 h-7 my-auto">
                <div className="flex items-center">
                  <Grape className="w-6 h-6 text-purple-600" />
                  <span className="text-sm text-gray-600">{vino.variedades.variedad}</span>
                </div>
                <div className="flex items-center">
                  <GlassWater className="w-6 h-6 text-blue-600" />
                  <span className="text-sm text-gray-600">{vino.nivel_alcohol} % Alcohol</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 row-start-3">{vino.descripcion}</p>
            
            <div className="flex items-center justify-between row-start-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">${vino.precio} COP</span>
                <span className="ml-2 text-sm text-gray-500">/ botella</span>
              </div>
              <Button size="lg" className="px-8">Añadir al carrito</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}