import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
            {/* Background Patterns/Image could go here */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-background to-background" />

            <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        The Smartest Way to Travel
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                        Book Your <span className="text-primary">Bus App</span> Ticket Easily
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

                <div className="relative hidden md:block h-[500px] w-full animate-in fade-in slide-in-from-right-5 duration-1000 delay-200">
                    {/* Illustration or Image placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-border">
                        <div className="text-center p-8">
                            <span className="text-9xl block mb-4">🚌</span>
                            <p className="text-2xl font-bold opacity-50">Just Go.</p>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary/80 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    )
}
