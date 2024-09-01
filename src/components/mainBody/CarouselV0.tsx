import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

export default function CarouselReact() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 100 }, [Autoplay()])
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <div className="w-4/5 mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">Nuestros Productos Destacados</h2>
      <Carousel ref={emblaRef} className="w-full">
        <CarouselContent className="-ml-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <CarouselItem key={index} className="pl-4 basis-1/4">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center space-x-2 pt-4">
        {scrollSnaps.map((_, index) => (
          <Button
            key={index}
            variant={index === selectedIndex ? "default" : "outline"}
            size="icon"
            className="w-3 h-3 rounded-full p-0"
            onClick={() => scrollTo(index * 3)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}