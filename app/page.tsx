import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Hero } from "@/components/sections/Hero";
import { Statistics } from "@/components/sections/Statistics";
import { BookingSection } from "@/components/sections/BookingSection";
import { AboutUs } from "@/components/sections/AboutUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Feedback } from "@/components/sections/Feedback";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Statistics />
      <BookingSection />
      <AboutUs />
      <Testimonials />
      <Contact />
      <Feedback />
      <Footer />
    </main>
  );
}
