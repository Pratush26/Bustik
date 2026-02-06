"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Frequent Traveler",
        content: "Bustik made my trip to Boston incredibly easy. The seat selection was accurate and the booking process was smooth.",
        avatar: "SJ",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Student",
        content: "Best prices I found online. I love the student discounts and the easy cancellation policy.",
        avatar: "MC",
        rating: 5
    },
    {
        name: "Emily Davis",
        role: "Commuter",
        content: "The app is so user-friendly. I book my weekly tickets in seconds now.",
        avatar: "ED",
        rating: 4
    },
    {
        name: "David Wilson",
        role: "Tourist",
        content: "Great experience! The bus was on time and exactly as described in the app.",
        avatar: "DW",
        rating: 5
    },
    {
        name: "Priya Patel",
        role: "Business Traveler",
        content: "I appreciate the punctual bus updates and the clean buses. Highly recommended.",
        avatar: "PP",
        rating: 5
    }
]

export function Testimonials() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return (
        <section className="py-24 container mx-auto px-4 bg-muted/20">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
                <p className="text-muted-foreground">Real feedback from real travelers.</p>
            </div>

            <div className="px-4 md:px-12">
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {testimonials.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card className="h-full border-none shadow-md">
                                        <CardContent className="flex flex-col justify-between h-[300px] p-6">
                                            <div>
                                                <div className="flex gap-1 mb-4 text-yellow-500">
                                                    {Array.from({ length: item.rating }).map((_, i) => (
                                                        <Star key={i} className="h-4 w-4 fill-current" />
                                                    ))}
                                                </div>
                                                <p className="text-muted-foreground italic mb-6">"{item.content}"</p>
                                            </div>

                                            <div className="flex items-center gap-4 mt-auto">
                                                <Avatar>
                                                    <AvatarFallback className="bg-primary/10 text-primary">{item.avatar}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className="font-bold text-sm">{item.name}</h4>
                                                    <p className="text-xs text-muted-foreground">{item.role}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}
