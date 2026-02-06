"use client"

import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/map/Map"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full rounded-xl bg-muted animate-pulse flex items-center justify-center">Loading Map...</div>
})

export function MapSection() {
    return (
        <section className="my-24 w-11/12 mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Network</h2>
                <p className="text-muted-foreground">Connecting major cities across Bangladesh.</p>
            </div>
            <Map />
        </section>
    )
}
