import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Grape, Wine as WineIcon } from "lucide-react";
import { useRef } from "react";
import { Card, CardContent } from "../ui/card";
import type { CarouselReactProps } from "./interface";

const CarouselReact: React.FC<CarouselReactProps> = ({ titulo, vinos }) => {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="mx-auto max-w-[85%] space-y-4 mt-5">
      <h2 className="text-2xl font-bold text-center">{titulo}</h2>
      <Carousel
        plugins={[plugin.current]} className="w-full max-w-5xl" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}
        >
        <CarouselPrevious />
        <CarouselContent className="flex flex-row">
          {vinos.map((vino) => (
            <CarouselItem key={vino.id_unica} className="flex-1 basis-1/3 flex-shrink-0 max-w-[33.33%]">
              {/* <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img src={vino.url_imagen} alt={vino.nombre} className="object-cover w-full h-full aspect-square border-b my-3" />
                <CardContent className="flex flex-col flex-grow p-4">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">{vino.nombre}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{vino.paises.pais}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Grape className="w-4 h-4 shrink-0 text-primary" />
                      <p className="text-sm truncate">{vino.variedades.variedad} - {vino.variedades.tipo}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-auto">
                    <span className="font-bold text-lg">${vino.precio}</span>
                    <WineIcon className="w-5 h-5 text-primary" />
                  </div>
                </CardContent>
              </Card> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CarouselReact;