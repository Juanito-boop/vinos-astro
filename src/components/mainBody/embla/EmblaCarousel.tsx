import ModalInfo from '@/components/modales/infoProducto/ModalInfo';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from '@/components/ui/card';
import { wineGlassBottle } from '@lucide/lab';
import useEmblaCarousel from 'embla-carousel-react';
import { Grape, Icon } from 'lucide-react';
import React from 'react';
import type { EmblaCarouselProps } from '../interface';
import {
	NextButton,
	PrevButton,
	usePrevNextButtons
} from './EmblaCarouselArrowButtons';
import { Image } from 'astro:assets';

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ titulo, options, vinos }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options as any);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick
	} = usePrevNextButtons(emblaApi as any);

	const clean = (bodega: string, pais: string) => 
		bodega
			.replace(/bodegas?\s*/i, '')
			.replace(/\by\b/gi, '')
			.replace(/,/g, '')
			.replace(new RegExp(pais, 'i'), '')
			.trim();

	return (
			<section>
				<h2 className='my-3 text-3xl text-center text-[#fdcd57] font-bold uppercase'>{titulo}</h2>
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container">
						{vinos.map((vino) => {
							const elemento = `${vino.nombre}~${vino.variedades.variedad}`.replace(/\s+/g, '-');
							const bodegaLimpia = clean(vino.bodega, vino.paises.pais);
							return (
								<ModalInfo key={vino.id_unica} elemento={elemento}>
									<Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg basis-1/3 mx-2">
										<picture className="relative aspect-square">
											<img src={vino.url_imagen} alt={vino.nombre} className={"object-cover w-full h-full bg-gray-400"}  />
											<Badge className='absolute top-2 right-2 text-base px-5' variant="default">{vino.variedades.tipo}</Badge>
										</picture>
										<CardContent className="flex flex-col flex-grow p-4">
											<div className="flex-grow">
												<h3 className="mb-1 text-lg font-semibold line-clamp-2">{vino.nombre}</h3>
												<p className="mb-2 text-sm text-muted-foreground flex flex-row gap-1">
													<Badge variant="destructive">{vino.paises.pais}</Badge>
													<Badge variant="default">{bodegaLimpia}</Badge>
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
								</ModalInfo>
							);
						})}
					</div>
				</div>
				<div className="embla__controls">
					<div className="embla__buttons">
						{vinos.length > 3 ? (
							<>
								<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
								<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
							</>
						) : (
							<>
								<div></div>
								<div></div>
							</>
						)}
					</div>
				</div>
			</section>
	);
}

export default EmblaCarousel;