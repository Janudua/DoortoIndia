"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { useState } from "react"
import CookiePolicyModal from "./cookie-policy-modal"
import { useData } from "@/contexts/data-context"

export default function Footer() {
  const [showCookiePolicy, setShowCookiePolicy] = useState(false)
  const { footer } = useData()

  // Default values if footer data not available
  const footerData = footer || {
    companyName: 'Door to India',
    tagline: 'Your Gateway to Incredible India',
    description: 'India Beyond Maps — Step Through the Door to unforgettable experiences.',
    email: 'info@doortoindia.in',
    phone: '+91 86073 05777',
    address: 'New Delhi, India',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
    },
    quickLinks: [
      { title: 'Home', url: '/' },
      { title: 'Tours', url: '/tours' },
      { title: 'Destinations', url: '/destinations' },
      { title: 'About Us', url: '/about' },
    ],
    policies: [],
    copyright: '© 2025 Door to India. All rights reserved.',
  }

  return (
    <>
      <footer className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_fbn6eefbn6eefbn6-esl1kzcoV9ttVHCmXg6yfEnaJ4l00y.png"
                  alt="Door to India Logo"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <span className="font-bold text-lg">{footerData.companyName}</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                {footerData.description}
              </p>
              <div className="flex gap-3">
                {footerData.socialMedia.facebook && (
                  <a href={footerData.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook size={18} className="cursor-pointer hover:text-primary" />
                  </a>
                )}
                {footerData.socialMedia.instagram && (
                  <a href={footerData.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram size={18} className="cursor-pointer hover:text-primary" />
                  </a>
                )}
                {footerData.socialMedia.twitter && (
                  <a href={footerData.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter size={18} className="cursor-pointer hover:text-primary" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {footerData.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.url} className="hover:text-primary transition">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tours */}
            <div>
              <h4 className="font-bold mb-4">Popular Tours</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Golden Triangle
                  </Link>
                </li>
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Kerala Backwaters
                  </Link>
                </li>
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Rajasthan Desert
                  </Link>
                </li>
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Himalayan Trek
                  </Link>
                </li>
                <li>
                  <Link href="/tours" className="hover:text-primary transition">
                    Goa Beaches
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  {footerData.phone}
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-primary" />
                  {footerData.email}
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                  {footerData.address}
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p className="text-center md:text-left">{footerData.copyright}</p>
              <button
                onClick={() => setShowCookiePolicy(true)}
                className="hover:text-primary transition whitespace-nowrap px-3 py-1 rounded hover:bg-gray-800"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Policy Modal */}
      {showCookiePolicy && <CookiePolicyModal onClose={() => setShowCookiePolicy(false)} />}
    </>
  )
}
