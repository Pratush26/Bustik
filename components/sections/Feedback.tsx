"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    rating: z.string().min(1, "Please select a rating to continue."),
    feedback: z.string().min(5, "Feedback must be at least 5 characters."),
})

export function Feedback() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        toast.success("Feedback Recieved!", {
            description: "Thank you for helping us improve."
        })
        form.reset()
    }

    return (
        <section id="feedback" className="py-20 container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center border rounded-2xl p-8 md:p-12 bg-card shadow-sm">
                <h2 className="text-3xl font-bold mb-4">Your Opinion Matters</h2>
                <p className="text-muted-foreground mb-8">
                    We are constantly working to improve our services. Share your travel experience with us.
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>How was your experience?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a rating" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="5">★★★★★ - Excellent</SelectItem>
                                            <SelectItem value="4">★★★★☆ - Good</SelectItem>
                                            <SelectItem value="3">★★★☆☆ - Average</SelectItem>
                                            <SelectItem value="2">★★☆☆☆ - Poor</SelectItem>
                                            <SelectItem value="1">★☆☆☆☆ - Terrible</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tell us more</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="What did you like? What can we do better?" className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Submit Feedback</Button>
                    </form>
                </Form>
            </div>
        </section>
    )
}
