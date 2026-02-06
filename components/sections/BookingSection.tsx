"use client"

import { useState } from "react"
import { SearchForm } from "@/components/booking/SearchForm"
import { SeatLayout } from "@/components/booking/SeatLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export function BookingSection() {
    const [searchData, setSearchData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [selectedSeats, setSelectedSeats] = useState<any[]>([])

    const handleSearch = (data: any) => {
        setLoading(true)
        // Mock API call
        setTimeout(() => {
            setSearchData(data)
            setLoading(false)
            setSelectedSeats([]) // Reset selections
        }, 1500)
    }

    const handleBook = () => {
        if (selectedSeats.length === 0) return
        toast.success("Booking Successful!", {
            description: `You have booked ${selectedSeats.length} seats for ${searchData.to}.`
        })
        // Reset or redirect logic here
        setSearchData(null)
        setSelectedSeats([])
    }

    const totalPrice = selectedSeats.length * (searchData?.ticketPrice || 0)

    return (
        <section id="booking" className="py-20 container mx-auto px-4 min-h-screen">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Book Your Ticket</h2>
                <p className="text-muted-foreground">Select your journey details and pick your favorite seat.</p>
            </div>

            {/* Search Form */}
            <div className="mb-12">
                <SearchForm onSearch={handleSearch} />
            </div>

            {/* Results Area */}
            {loading && (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            )}

            {!loading && searchData && (
                <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-5">
                    {/* Seat Selection */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Select Seats</CardTitle>
                                <CardDescription>
                                    {searchData.from} to {searchData.to} • {searchData.time}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SeatLayout onSeatSelect={setSelectedSeats} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Booking Summary */}
                    <div>
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Booking Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Route</span>
                                    <span className="font-medium">{searchData.from} ➝ {searchData.to}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Date</span>
                                    <span className="font-medium">{searchData.date.toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Time</span>
                                    <span className="font-medium">{searchData.time}</span>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="font-medium mb-2 text-sm">Selected Seats</h4>
                                    {selectedSeats.length === 0 ? (
                                        <p className="text-sm text-muted-foreground italic">No seats selected</p>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedSeats.map(seat => (
                                                <Badge key={seat.id} variant="secondary">{seat.number}</Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <Separator />

                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">${totalPrice}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    disabled={selectedSeats.length === 0}
                                    onClick={handleBook}
                                >
                                    Confirm Booking
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}
        </section>
    )
}
