import Header from "@/components/header"
import Footer from "@/components/footer"
import { Award, Users, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-4">About Door to India</h1>
          <p className="text-lg text-gray-200">India Beyond Maps — Step Through the Door</p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8">About Door to India</h2>
          <div className="space-y-6 text-lg text-card-foreground leading-relaxed">
            <p>
              Door to India was born from a simple idea — to help the world experience the real India, not just see it.
              We noticed how most tours focused on monuments, not meaning; itineraries, not experiences. So we set out
              to change that.
            </p>
            <p>
              Our team of travel experts and cultural insiders design journeys that balance authentic exploration with
              refined comfort. Whether it's dining with locals in Rajasthan, cruising through Kerala's backwaters, or
              walking through Delhi's heritage lanes, every trip is curated to connect travelers with India's living
              heartbeat.
            </p>
            <p className="font-semibold text-primary text-xl">
              At Door to India, we don't sell tours — we craft stories you'll carry forever.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <div className="space-y-4 text-lg text-card-foreground leading-relaxed">
              <p>
                At Door to India, we craft bespoke travel experiences that reveal the country's true essence — a harmony
                of heritage, culture, and luxury.
              </p>
              <p>
                Our journeys are designed for international travelers who seek authenticity wrapped in comfort — from
                royal palaces and spiritual retreats to breathtaking landscapes and hidden gems.
              </p>
              <p>
                With deep local expertise and a refined sense of hospitality, we ensure every moment is seamless,
                meaningful, and unforgettable. At Door to India, we don't just open doors to places — we open doors to
                stories, traditions, and moments that stay with you for a lifetime.
              </p>
            </div>
          </div>
          <img src="/india-travel-adventure.jpg" alt="Our Mission" className="rounded-lg shadow-lg" />
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="bg-card p-8 rounded-lg text-center hover:shadow-lg transition">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Quality</h3>
            <p className="text-muted-foreground">
              Premium experiences with expert guides, comfortable accommodations, and personalized service.
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg text-center hover:shadow-lg transition">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Community</h3>
            <p className="text-muted-foreground">
              Supporting local communities through fair-trade practices and cultural preservation.
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg text-center hover:shadow-lg transition">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Adventure</h3>
            <p className="text-muted-foreground">
              Thrilling experiences from desert safaris to mountain treks, for all adventure levels.
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg text-center hover:shadow-lg transition">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Sustainability</h3>
            <p className="text-muted-foreground">
              Eco-friendly practices to preserve India's natural beauty for future generations.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <section className="bg-accent/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: "5K+", label: "Happy Travelers" },
                { number: "50+", label: "Destinations" },
                { number: "4.9★", label: "Average Rating" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-lg text-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  )
}
