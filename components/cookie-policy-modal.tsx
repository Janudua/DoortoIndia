"use client"

import { X } from "lucide-react"

interface CookiePolicyModalProps {
  onClose: () => void
}

export default function CookiePolicyModal({ onClose }: CookiePolicyModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 bg-white border-b p-6">
          <h2 className="text-2xl font-bold text-gray-900">Cookie Policy</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition" aria-label="Close">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-gray-700 space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What Are Cookies?</h3>
            <p className="text-sm leading-relaxed">
              Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit our
              website. They help us recognize you, remember your preferences, and enhance your browsing experience.
              Cookies are widely used by websites to make them more functional and user-friendly.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Why We Use Cookies</h3>
            <p className="text-sm leading-relaxed mb-3">Door to India uses cookies for the following purposes:</p>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to function properly, including security
                and login credentials.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website, allowing
                us to improve your experience.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your choices, such as language preference, currency, and
                display settings.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Track your activity to deliver personalized advertisements and
                promotions relevant to your interests.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Types of Cookies We Use</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold">Session Cookies</p>
                <p>These are temporary cookies that are deleted when you close your browser.</p>
              </div>
              <div>
                <p className="font-semibold">Persistent Cookies</p>
                <p>These remain on your device for a specified period or until you delete them manually.</p>
              </div>
              <div>
                <p className="font-semibold">Third-Party Cookies</p>
                <p>
                  Set by external services (e.g., analytics providers, social media platforms) to track your activity
                  across websites.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Cookie Choices</h3>
            <p className="text-sm leading-relaxed mb-3">You have the right to control cookies on your device:</p>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Accept or reject cookies through your browser settings.</li>
              <li>Delete existing cookies at any time from your device.</li>
              <li>Set your browser to warn you before accepting cookies.</li>
              <li>Disable certain cookie types while allowing others.</li>
            </ul>
            <p className="text-sm mt-3 text-gray-600">
              Please note: Disabling essential cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Privacy</h3>
            <p className="text-sm leading-relaxed">
              We are committed to protecting your personal information. Any data collected through cookies is handled in
              accordance with applicable privacy laws and our Privacy Policy. We do not sell your personal information
              to third parties without your consent.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h3>
            <p className="text-sm leading-relaxed">
              If you have questions about our cookie policy or how we use cookies, please contact us at:
            </p>
            <div className="text-sm mt-2 space-y-1">
              <p>
                <strong>Email:</strong> info@doortoindia.in
              </p>
              <p>
                <strong>Phone:</strong> +91 86073 05777
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Policy Updates</h3>
            <p className="text-sm leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws.
              We encourage you to review this policy periodically for any updates.
            </p>
            <p className="text-xs text-gray-500 mt-3">Last Updated: November 2025</p>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
