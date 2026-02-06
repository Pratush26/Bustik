import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AboutUs() {
    return (
        <section id="about" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">About Bustik</h2>
                    <h3 className="text-xl text-primary font-medium">Reinventing Bus Travel Experience</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Bustik is dedicated to providing the most seamless and comfortable bus ticket booking experience. We connect major cities and varied routes with a fleet of premium bus operators. Our goal is to make your journey as pleasant as the destination.
                    </p>
                    <div className="space-y-4">
                        <div className="p-4 bg-background rounded-lg border shadow-sm">
                            <h4 className="font-bold mb-1">Safety First</h4>
                            <p className="text-sm text-muted-foreground">Verified operators with top safety ratings.</p>
                        </div>
                        <div className="p-4 bg-background rounded-lg border shadow-sm">
                            <h4 className="font-bold mb-1">Comfort Guaranteed</h4>
                            <p className="text-sm text-muted-foreground">Reclining seats, AC, and onboard Wi-Fi.</p>
                        </div>
                    </div>
                </div>

                <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    {/* Image Placeholder */}
                    <div className="text-center">
                        <span className="text-6xl mb-4 block">🛣️</span>
                        <p className="font-bold text-xl">Thousands of Happy Journeys</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
