import { Card, CardContent } from '@/components/ui/card';
import { wineGlassBottle } from '@lucide/lab';
import useEmblaCarousel from 'embla-carousel-react';
import { Grape, Icon } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import React from 'react';
import type { EmblaCarouselProps } from '../interface';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons';

const EmblaCarousel: React.FC<EmblaCarouselProps> = (props) => {
  const { titulo, options, vinos } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options as any)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi as any)

  const clean = (bodega: string, pais: string) => {
    return bodega
      .replace(/bodegas?\s*/i, '')
      .replace(/,/g, '')
      .replace(new RegExp(pais, 'i'), '')
      .trim()
  }

  return (
    <section className=''>
      <h2 className='w-full my-3 text-3xl text-center'>{titulo}</h2>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {vinos.map((vino, _index) => (
            <a href={`informacion/${vino.nombre}~${vino.variedades.variedad}`.replace(/\s+/g, '-')} key={vino.id_unica} className="flex-1 gap-x-2 basis-1/3 flex-shrink-0 max-w-[33.33%]">
              <Card className="flex flex-col mx-3 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <div className="relative aspect-square">
                  <img src={vino.url_imagen} alt={vino.nombre} className="object-cover w-full h-full" />
                  {/* <div className=" w-auto px-4 py-1 mr-auto text-white bg-black rounded-lg ">
                    
                  </div> */}
                  <Badge className='absolute top-2 right-2 text-base px-5' variant="default">{vino.variedades.tipo}</Badge>
                </div>
                <CardContent className="flex flex-col flex-grow p-4">
                  <div className="flex-grow">
                    <h3 className="mb-1 text-lg font-semibold line-clamp-2">{vino.nombre}</h3>
                    <p className="mb-2 text-sm text-muted-foreground flex flex-row gap-1">
                      <Badge variant="destructive">{vino.paises.pais}</Badge>
                      <Badge variant="default">{clean(vino.bodega, vino.paises.pais)}</Badge>
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <Grape className="w-4 h-4 shrink-0 text-primary text-purple-600" />
                      <Badge variant="outline" className='bg-[#56070C] text-white px-3 text-sm truncate'>
                        {vino.variedades.variedad}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-auto">
                    <span className="text-lg font-bold">${vino.precio} COP</span>
                    <Icon iconNode={wineGlassBottle} className='text-purple-600' />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
