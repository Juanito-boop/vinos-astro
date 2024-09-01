"'use client'"

import { Card, CardContent } from "@/components/ui/card"
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

export default function WineCard() {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {wines.map((wine, index) => (
        <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="aspect-square relative">
            <img
              src={wine.imageUrl}
              alt={wine.name}
              className="object-cover w-full h-full"
            />
            <Badge className="absolute top-2 right-2 bg-slate-900/80 dark:bg-slate-50/80">{wine.type}</Badge>
          </div>
          <CardContent className="flex flex-col flex-grow p-4">
            <div className="flex-grow">
              <h3 className="font-semibold text-lg mb-1 line-clamp-2 h-14">{wine.name}</h3>
              <p className="text-sm text-slate-500 mb-2 dark:text-slate-400">{wine.year} - {wine.region}</p>
              <div className="flex items-center gap-2 mb-2">
                <Grape className="w-4 h-4 shrink-0 text-slate-900 dark:text-slate-50" />
                <p className="text-sm truncate">{wine.grapes.join(",")}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 mt-auto">
              <span className="font-bold text-lg">${wine.price.toFixed(2)}</span>
              <GlassWater className="w-5 h-5 text-slate-900 dark:text-slate-50" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}