import { Users, Ticket, MapPin, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
    {
        label: "Happy Travelers",
        value: "50k+",
        icon: Users,
        color: "text-blue-500",
    },
    {
        label: "Tickets Sold",
        value: "120k+",
        icon: Ticket,
        color: "text-green-500",
    },
    {
        label: "Cities Connected",
        value: "100+",
        icon: MapPin,
        color: "text-red-500",
    },
    {
        label: "Years Experience",
        value: "10+",
        icon: Award,
        color: "text-yellow-500",
    },
]

export function Statistics() {
    return (
        <section id="stats" className="py-18 bg-muted/50">
            <div className="w-11/12 mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Taking You Further</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We pride ourselves on connecting people and places with comfort and reliability.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="border-none shadow-sm bg-background/50 hover:bg-background transition-colors">
                            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                <div className={`p-3 rounded-full bg-background shadow-sm mb-4 ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
