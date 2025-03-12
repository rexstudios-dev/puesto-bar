import { Navbar } from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Menu from "@/components/menu"
import InstagramFeed from "@/components/instagram-feed"
import Location from "@/components/location"
import Footer from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f5f0]">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <InstagramFeed />
      <Location />
      <Footer />
      <ScrollToTop />
    </main>
  )
}

