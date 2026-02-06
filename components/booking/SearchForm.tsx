"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, MapPin, Bus } from "lucide-react"
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
import { LOCATIONS, BUS_TYPES, AVAILABLE_TIMES } from "@/lib/data"
import { useEffect, useState } from "react"

const formSchema = z.object({
    from: z.string().min(1, "Please select a departure city."),
    to: z.string().min(1, "Please select a destination."),
    date: z.date("A date of travel is required."),
    time: z.string().min(1, "Please select a time."),
    busId: z.string().min(1, "Please select a bus."),
})

export function SearchForm({ onSearch }: { onSearch: (data: any) => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("/api/schedule", {
                    cache: "no-store"
                });
                if (!res.ok) throw new Error("Failed to fetch");

                const result = await res.json();
                setSchedule(result ?? result);
            } catch (err: unknown) {
                setSchedule([]);
                console.error(err)
            }
        };
        fetchdata();
    }, []);

    function onSubmit(data: z.infer<typeof formSchema>) {
        // Validate different origin/dest
        if (data.from === data.to) {
            toast.error("Origin and Destination cannot be the same")
            return
        }

        // Find detailed bus info
        const selectedBus = BUS_TYPES.find(b => b.id === data.busId)

        onSearch({
            ...data,
            busName: selectedBus?.name,
            ticketPrice: selectedBus?.price,
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <SelectValue placeholder="Origin" />
                                            </div>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {LOCATIONS.map(loc => (
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <SelectValue placeholder="Destination" />
                                            </div>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {LOCATIONS.map(loc => (
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {AVAILABLE_TIMES.map(t => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <div className="flex items-center gap-2">
                                                <Bus className="h-4 w-4 text-muted-foreground" />
                                                <SelectValue placeholder="Select valid bus" />
                                            </div>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {BUS_TYPES.map(bus => (
                                            <SelectItem key={bus.id} value={bus.id}>
                                                {bus.name} - ${bus.price}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" size="lg" className="w-full">
                        Check Available Seats
                    </Button>
                </div>
            </form>
        </Form>
    )
}
