import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import FeaturedTours from "@/components/featured-tours"
import Testimonials from "@/components/testimonials"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <FeaturedTours />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
