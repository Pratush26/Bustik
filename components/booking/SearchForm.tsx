"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, MapPin, Bus, Clock } from "lucide-react"
import { format, addDays } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const formSchema = z.object({
    from: z.string().min(1, "Please select a departure city."),
    to: z.string().min(1, "Please select a destination."),
    date: z.date("A date of travel is required."),
    time: z.string().min(1, "Please select a time."),
    busId: z.string().min(1, "Please select a bus."),
})

interface BusSchedule {
    _id: string;
    from: string;
    to: string;
    bus: string;
    price: number;
    time: string;
}

export function SearchForm({ onSearch }: { onSearch: (data: any) => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const [schedules, setSchedules] = useState<BusSchedule[]>([])
    const [loading, setLoading] = useState(true)

    // Watched values
    const selectedFrom = form.watch("from")
    const selectedTo = form.watch("to")
    const selectedTime = form.watch("time")

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const res = await fetch("/api/schedule", {
                    cache: "no-store"
                });
                if (!res.ok) throw new Error("Failed to fetch");
                const result = await res.json();
                setSchedules(Array.isArray(result) ? result : []);
            } catch (err: unknown) {
                console.error(err)
                toast.error("Failed to load schedules")
                setSchedules([]);
            } finally {
                setLoading(false)
            }
        };
        fetchSchedules();
    }, []);

    const fromOptions = Array.from(new Set(schedules.map(s => s.from))).sort();
    const toOptions = Array.from(new Set(schedules.map(s => s.to))).sort();

    const availableRoutes = schedules.filter(s =>
        s.from === selectedFrom && s.to === selectedTo
    );

    const timeOptions = Array.from(new Set(availableRoutes.map(s => s.time))).sort();

    const relevantBuses = selectedTime
        ? availableRoutes.filter(s => s.time === selectedTime)
        : availableRoutes;

    const busOptions = Array.from(new Set(relevantBuses.map(s => s.bus)));

    useEffect(() => {
        form.setValue("time", "")
        form.setValue("busId", "")
    }, [selectedFrom, selectedTo, form])

    useEffect(() => {
        form.setValue("busId", "")
    }, [selectedTime, form])


    function onSubmit(data: z.infer<typeof formSchema>) {
        if (data.from === data.to) {
            toast.error("Origin and Destination cannot be the same")
            return
        }

        const scheduleEntry = schedules.find(s =>
            s.from === data.from &&
            s.to === data.to &&
            s.bus === data.busId &&
            s.time === data.time
        ) || schedules.find(s => s.bus === data.busId);

        onSearch({
            ...data,
            busName: data.busId,
            scheduleId: scheduleEntry?._id,
            ticketPrice: scheduleEntry?.price || 0,
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card p-6 rounded-xl shadow-lg border space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>From</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <SelectValue placeholder="Origin" />
                                            </div>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {fromOptions.map(loc => (
                                            <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>To</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <SelectValue placeholder="Destination" />
                                            </div>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {toOptions.map(loc => (
                                            <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => {
                                                const today = new Date();
                                                const maxDate = addDays(today, 20);
                                                return date < new Date(today.setHours(0, 0, 0, 0)) || date > maxDate;
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={!selectedFrom || !selectedTo || availableRoutes.length === 0}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <SelectValue placeholder="Select time" />
                                            </div>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {timeOptions.length > 0 ? (
                                            timeOptions.map(t => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="none" disabled>No schedules available</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-end">
                    <FormField
                        control={form.control}
                        name="busId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Choose Bus</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={!selectedFrom || !selectedTo || availableRoutes.length === 0}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <div className="flex items-center gap-2">
                                                <Bus className="h-4 w-4 text-muted-foreground" />
                                                <SelectValue placeholder="Select bus" />
                                            </div>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {busOptions.length > 0 ? (
                                            busOptions.map(bus => {
                                                const schedule = availableRoutes.find(s => s.bus === bus && (selectedTime ? s.time === selectedTime : true));
                                                return (
                                                    <SelectItem key={bus} value={bus}>
                                                        {bus} {schedule ? `- ৳${schedule.price}` : ""}
                                                    </SelectItem>
                                                )
                                            })
                                        ) : (
                                            <SelectItem value="none" disabled>No buses available</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" size="lg" className="w-full" disabled={!selectedFrom || !selectedTo || !selectedTime || availableRoutes.length === 0}>
                        Check Available Seats
                    </Button>
                </div>
            </form>
        </Form>
    )
}
