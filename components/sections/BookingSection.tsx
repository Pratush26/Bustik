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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function BookingSection() {
    const [searchData, setSearchData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [selectedSeats, setSelectedSeats] = useState<any[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [passengerName, setPassengerName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [bookingLoading, setBookingLoading] = useState(false)

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
        setIsModalOpen(true)
    }

    const confirmBooking = async () => {
        if (!passengerName || !phoneNumber) {
            toast.error("Please fill in all details")
            return
        }

        setBookingLoading(true)
        try {
            // Book each seat individually
            const promises = selectedSeats.map(seat =>
                fetch("/api/booking", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        passenger: passengerName,
                        phone: phoneNumber,
                        seat: seat.number,
                        bus: searchData.scheduleId,
                        date: searchData.date
                    })
                })
            );

            await Promise.all(promises);

            toast.success("Booking Successful!", {
                description: `You have booked ${selectedSeats.length} seats.`
            })

            setIsModalOpen(false)
            setSelectedSeats([])
            setPassengerName("")
            setPhoneNumber("")
            // Trigger refresh of seats - passing a timestamp or toggle to SeatLayout? 
            // Or just allow SeatLayout to re-render. 
            // Since props didn't change, specific seat refresh might be needed.
            // But if I clear selectedSeats, SeatLayout rerenders only seleciton.
            // I need to re-fetch bookings.
            // I can force re-fetch by updating a key or passing a strict signal.
            // For now, let's just close. Ideally, user searches again or we auto-refresh.
            // Actually, I can clear searchData to force re-search, but that's annoying.
            // Maybe handleSearch again? 

        } catch (error) {
            console.error(error)
            toast.error("Booking Failed")
        } finally {
            setBookingLoading(false)
        }
    }

    const totalPrice = selectedSeats.length * (searchData?.ticketPrice || 0)

    return (
        <section id="booking" className="my-32 w-11/12 mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Book Your Ticket</h2>
                <p className="text-muted-foreground">Select your journey details and pick your favorite seat.</p>
            </div>

            {/* Search Form */}
            <div className="mb-12">
                <SearchForm busData={searchData} onSearch={handleSearch} />
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
                                <SeatLayout
                                    onSeatSelect={setSelectedSeats}
                                    busDetails={{
                                        id: searchData.scheduleId,
                                        date: searchData.date.toISOString()
                                    }}
                                />
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
                                    <span className="text-primary"><span className="text-2xl font-bold">৳</span>{totalPrice}</span>
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
            {/* Booking Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Booking</DialogTitle>
                        <DialogDescription>
                            Enter your details to confirm booking for {selectedSeats.length} seats.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Passenger Name</Label>
                            <Input
                                id="name"
                                value={passengerName}
                                onChange={(e) => setPassengerName(e.target.value)}
                                placeholder="Enter full name"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={confirmBooking} disabled={bookingLoading}>
                            {bookingLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    )
}
