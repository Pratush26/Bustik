import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-muted py-12">
            <div className="w-11/12 mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                            <span className="text-3xl">🚌</span>
                            Bustik
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Making bus travel accessible, comfortable, and reliable for everyone.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                            <Link href="#home" className="hover:text-primary">Home</Link>
                            <Link href="#booking" className="hover:text-primary">Book Ticket</Link>
                            <Link href="#about" className="hover:text-primary">About Us</Link>
                            <Link href="#contact" className="hover:text-primary">Contact</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                            <Link href="#faqs" className="hover:text-primary">FAQ</Link>
                            <Link href="#" className="hover:text-primary">Terms of Service</Link>
                            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                            <Link href="#" className="hover:text-primary">Help Center</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Bustik Inc. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        <span>Built with ❤️ for travelers.</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
