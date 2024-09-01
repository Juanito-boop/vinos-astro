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
import { Badge } from "@/components/ui/badge"
import { GlassWater, Grape } from "lucide-react"

interface WineCardProps {
  name: string
  year: number
  type: string
  region: string
  grapes: string[]
  imageUrl: string
  price: number
}

export default function CarouselSize() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 3 }, [Autoplay()])
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const wines: WineCardProps[] = [
    {
      name: "Château Margaux Premier Grand Cru Classé",
      year: 2015,
      type: "Tinto",
      region: "Bordeaux, Francia",
      grapes: ["Cabernet Sauvignon", "Merlot", "Petit Verdot", "Cabernet Franc"],
      imageUrl: "/placeholder.svg?height=200&width=200",
      price: 699.99
    },
    {
      name: "Opus One",
      year: 2018,
      type: "Tinto",
      region: "Napa Valley, USA",
      grapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"],
      imageUrl: "/placeholder.svg?height=200&width=200",
      price: 349.99
    },
    {
      name: "Cloudy Bay Sauvignon Blanc",
      year: 2021,
      type: "Blanco",
      grapes: ["Sauvignon Blanc"],
      region: "Marlborough, Nueva Zelanda",
      imageUrl: "/placeholder.svg?height=200&width=200",
      price: 29.99
    }
  ]

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
        <CarouselContent className="">
          {wines.map((wine, index) => (
            <CarouselItem key={index} className="w-full">
              <Card className="w-1/2">
                <img
                  className="w-full h-40 object-cover"
                  src={wine.imageUrl}
                  alt={wine.name}
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold">{wine.name}</h3>
                  <p className="text-sm text-gray-500">{wine.year}</p>
                  <p className="text-sm text-gray-500">{wine.region}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500 text-white">
                      <GlassWater size={16} />
                    </Badge>
                    <Badge className="bg-red-500 text-white">
                      <Grape size={16} />
                    </Badge>
                    {wine.grapes.map((grape, index) => (
                      <span key={index} className="text-sm text-gray-500">{grape}</span>
                    ))}
                  </div>
                  <p className="text-lg font-bold">${wine.price} COP</p>
                  <Button className="mt-4">Ver más</Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}