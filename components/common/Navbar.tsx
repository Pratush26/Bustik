"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { ModeToggle } from "@/components/common/ModeToggle"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Stats", href: "#stats" },
        { name: "Book Ticket", href: "#booking" },
        { name: "About Us", href: "#about" },
        { name: "Contact", href: "#contact" },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
                    : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    <span className="text-3xl">🚌</span>
                    Bustik
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <ModeToggle />
                    <Button asChild>
                        <Link href="#booking">Book Now</Link>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="flex md:hidden items-center gap-4">
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-6 mt-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-medium hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Button asChild className="mt-4">
                                    <Link href="#booking">Book Now</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
