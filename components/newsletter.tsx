"use client"

import { Mail } from "lucide-react"

export default function Newsletter() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Ready to Experience India?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Subscribe to get exclusive travel deals, insider tips, and early access to new tour packages
        </p>

        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white border border-border rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        <p className="text-sm text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  )
}
