import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
    return (
        <section id="home" className="relative min-h-[90vh] flex items-center w-full overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-background to-background" />

            <div className="w-11/12 mx-auto z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        The Smartest Way to Travel
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                        Book Your <span className="text-primary">Bus Ticket</span> Easily
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-lg">
                        Experience comfortable and safe journeys. Choose your destination, pick your seat, and travel with confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button size="lg" className="text-lg px-8" asChild>
                            <Link href="#booking">Find Tickets</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                            <Link href="#about">Learn More</Link>
                        </Button>
                    </div>

                    {/* Micro-stats or trust indicators */}
                    <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span>Instant Booking</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                            <span>Secure Payments</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-purple-500" />
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>

                <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <Image
                        src={'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                        fill
                        alt="bus image"
                        priority
                        className="object-cover grayscale-25 contrast-110"
                    />
                </div>
            </div>
        </section>
    )
}
