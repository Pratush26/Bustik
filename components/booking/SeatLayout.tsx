"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Armchair } from "lucide-react"
import { toast } from "sonner"
import { ObjectId } from "mongodb"

interface Seat {
    id: string
    number: string
    isBooked: boolean
    price: number
}
interface Bookings {
    _id: ObjectId
    passenger: string
    phone: string
    seat: string
    bus: ObjectId
    date: string
    createdAt: string
}

const generateSeats = (): Seat[] => {
    const seats: Seat[] = []
    const rows = 10
    const colLabels = ['A', 'B', 'C', 'D']

    for (let i = 1; i <= rows; i++) {
        colLabels.forEach((col) => {
            seats.push({
                id: `${i}${col}`,
                number: `${i}${col}`,
                isBooked: false,
                price: 25 // flat price
            })
        })
    }
    return seats
}

interface SeatLayoutProps {
    busDetails: {
        id: string,
        date: string
    },
    onSeatSelect: (selectedSeats: Seat[]) => void
}

export function SeatLayout({ busDetails, onSeatSelect }: SeatLayoutProps) {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const [seats, setSeats] = useState<Seat[]>(generateSeats())

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch(`/api/bookings?id=${busDetails.id}&date=${busDetails.date}`, {
                    cache: "no-store"
                });
                if (!res.ok) throw new Error("Failed to fetch");
                const bookings = await res.json();

                // Extract booked seat numbers
                const bookedSeatNumbers = bookings.map((b: Bookings) => b.seat);

                // Update seats state
                setSeats(prev => prev.map(seat => ({
                    ...seat,
                    isBooked: bookedSeatNumbers.includes(seat.number)
                })));

            } catch (err: unknown) {
                console.error(err)
                toast.error("Failed to load seat availability")
            }
        };
        fetchBookings();
    }, [busDetails]);

    const handleSeatClick = (seat: Seat) => {
        if (seat.isBooked) return

        let newSelected: string[]
        if (selectedSeats.includes(seat.id)) {
            newSelected = selectedSeats.filter(id => id !== seat.id)
        } else {
            if (selectedSeats.length >= 6) return // Max 6 seats
            newSelected = [...selectedSeats, seat.id]
        }

        setSelectedSeats(newSelected)

        // Find full seat objects to return
        const selectedSeatObjects = seats.filter(s => newSelected.includes(s.id))
        onSeatSelect(selectedSeatObjects)
    }

    // Helper to get seat by row and col index
    const getSeat = (row: number, colIndex: number) => {
        const colLabels = ['A', 'B', 'C', 'D']
        const seatId = `${row}${colLabels[colIndex]}`
        return seats.find(s => s.id === seatId)
    }

    return (
        <div className="flex flex-col items-center">
            {/* Driver Icon */}
            <div className="w-full flex justify-end mb-8 px-12">
                <div className="border border-border p-2 rounded-md bg-muted text-muted-foreground w-12 text-center text-xs">
                    Driver
                </div>
            </div>

            <div className="grid gap-y-4 gap-x-12">
                {Array.from({ length: 10 }).map((_, rowIndex) => {
                    const row = rowIndex + 1
                    return (
                        <div key={row} className="flex gap-4">
                            {/* Left Side (A, B) */}
                            <div className="flex gap-2">
                                <SeatIcon seat={getSeat(row, 0)} isSelected={selectedSeats.includes(getSeat(row, 0)?.id || '')} onClick={handleSeatClick} />
                                <SeatIcon seat={getSeat(row, 1)} isSelected={selectedSeats.includes(getSeat(row, 1)?.id || '')} onClick={handleSeatClick} />
                            </div>

                            {/* Aisle */}
                            <div className="w-8" />

                            {/* Right Side (C, D) */}
                            <div className="flex gap-2">
                                <SeatIcon seat={getSeat(row, 2)} isSelected={selectedSeats.includes(getSeat(row, 2)?.id || '')} onClick={handleSeatClick} />
                                <SeatIcon seat={getSeat(row, 3)} isSelected={selectedSeats.includes(getSeat(row, 3)?.id || '')} onClick={handleSeatClick} />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Legend */}
            <div className="mt-8 flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-primary" />
                    <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-muted border border-input" />
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-muted-foreground/30" />
                    <span>Booked</span>
                </div>
            </div>
        </div>
    )
}

function SeatIcon({ seat, isSelected, onClick }: { seat?: Seat, isSelected: boolean, onClick: (s: Seat) => void }) {
    if (!seat) return <div className="w-10 h-10" />

    return (
        <button
            type="button"
            disabled={seat.isBooked}
            onClick={() => onClick(seat)}
            className={cn(
                "w-10 h-10 rounded-t-lg rounded-b-sm border flex items-center justify-center transition-all",
                seat.isBooked
                    ? "bg-muted-foreground/30 border-transparent cursor-not-allowed text-muted-foreground/50"
                    : isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-muted border-input text-foreground"
            )}
            title={seat.isBooked ? "Booked" : `Seat ${seat.number} - ৳${seat.price}`}
        >
            <Armchair className="w-6 h-6" />
        </button>
    )
}
