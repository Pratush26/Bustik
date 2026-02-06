import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground">Everything you need to know about booking with Bustik.</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do I book a ticket?</AccordionTrigger>
                        <AccordionContent>
                            Booking is simple! Just enter your departure and arrival cities, select your travel date, and click Search. Choose your preferred bus and seat, then proceed to payment.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Can I cancel my ticket?</AccordionTrigger>
                        <AccordionContent>
                            Yes, you can cancel your ticket up to 24 hours before departure for a full refund. Cancellations within 24 hours may incur a small fee.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Do I need to print my ticket?</AccordionTrigger>
                        <AccordionContent>
                            No, m-tickets are accepted. Show the SMS or email confirmation on your phone along with a valid ID proof while boarding.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Are the buses air-conditioned?</AccordionTrigger>
                        <AccordionContent>
                            We offer both AC and Non-AC buses. You can check the bus type (AC/Non-AC) listed next to the bus name when selecting your trip.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                        <AccordionContent>
                            We accept all major credit/debit cards, mobile banking (Bkash, Nagad), and net banking.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}
