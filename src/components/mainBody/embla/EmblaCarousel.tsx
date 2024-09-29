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
import Bandera from '@/components/modales/infoProducto/Banderas';

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

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ titulo, options, vinos }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options as any);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick
	} = usePrevNextButtons(emblaApi as any);

	return (
			<section>
				<h2 className='my-3 text-3xl text-center text-[#fdcd57] font-bold uppercase'>{titulo}</h2>
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container">
						{vinos.map((vino) => {
							const elemento = `${vino.nombre}~${vino.variedades}`.replace(/\s+/g, '-');
							return (
								<ModalInfo key={(vino.id_vino).length} elemento={elemento}>
									<Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg rounded-xl basis-1/3 mx-2">
										<picture className="relative aspect-square">
											<img src={vino.url_imagen} alt={vino.nombre} className="object-cover w-full h-full bg-gray-400 p-5" />
											<div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
												{vino.variedades.map((variedad, index) => (
													<Badge key={index} className='text-white px-3 text-sm inline-block' variant="default">
														{variedad}
													</Badge>
												))}
											</div>
											<div className='absolute top-3 left-3 flex flex-row items-start gap-x-2'>
												<div className="flex flex-col gap-2">
													<Badge variant="default">{vino.anada}</Badge>
													<Badge variant="default">{vino.color_vino}</Badge>
												</div>
												<div className='mx-auto max-w-12 border border-black'>
													{getBandera(vino.pais_importacion ?? "")}
												</div>
											</div>
										</picture>
										<CardContent className="flex flex-col flex-grow p-4">
											<div className="flex-grow">
												<h3 className="mb-1 text-lg font-semibold line-clamp-2">{vino.nombre}</h3>
												<p className="mb-2 text-sm text-muted-foreground flex flex-row gap-1">
													<Badge variant="destructive">{vino.pais_importacion}</Badge>
													<Badge variant="default">{vino.bodega}</Badge>
													<Badge variant="default">{vino.tipo_crianza}</Badge>
												</p>
												<div className="flex items-center gap-2 mb-2">
													<Grape className="w-4 h-4 shrink-0 text-primary text-purple-600" />
													{vino.variedades.map((variedad, index) => (
														<Badge key={index} variant="outline" className='bg-[#56070C] text-white px-3 text-sm truncate'>
															{variedad}
														</Badge>
													))}
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
						<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
						<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
					</div>
				</div>
			</section>
	);
}

export default EmblaCarousel;