"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, MapPin } from "lucide-react"
import { format } from "date-fns"

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

const locations = [
    "New York",
    "Boston",
    "Washington DC",
    "Philadelphia",
    "Miami",
    "Chicago",
]

const formSchema = z.object({
    from: z.string().min(1, "Please select a departure city."),
    to: z.string().min(1, "Please select a destination."),
    date: z.date({
        required_error: "A date of travel is required.",
    }),
    time: z.string().min(1, "Please select a time."),
})

export function SearchForm({ onSearch }: { onSearch: (data: z.infer<typeof formSchema>) => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        // Validate different origin/dest
        if (data.from === data.to) {
            toast.error("Origin and Destination cannot be the same")
            return
        }
        onSearch(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-0 md:flex md:gap-4 items-end bg-card p-6 rounded-xl shadow-lg border">

                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
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
                                        {locations.map(loc => (
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
                                        {locations.map(loc => (
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
                                            disabled={(date) =>
                                                date < new Date() || date < new Date("1900-01-01")
                                            }
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
                                        <SelectItem value="08:00 AM">08:00 AM</SelectItem>
                                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                        <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                                        <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                                        <SelectItem value="08:00 PM">08:00 PM</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">Search Buses</Button>
            </form>
        </Form>
    )
}
