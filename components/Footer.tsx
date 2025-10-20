import Link from 'next/link'
import { Facebook, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-teal-400 mb-4">
              L&C <span className="text-sky-400">Cleaning Services</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted cleaning partner across the UK. Professional, reliable, and affordable 
              cleaning services for homes and businesses. Your mess is our mission!
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/lccleaningservicesltd" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://wa.me/447413069737" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Contact us on WhatsApp"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-gray-300 hover:text-white transition-colors">
                  Book Online
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-teal-400 mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="https://wa.me/447413069737" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    WhatsApp: +44 7413 069737
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Facebook size={18} className="text-teal-400 mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="https://www.facebook.com/lccleaningservicesltd" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Facebook Page
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-teal-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  Serving all regions<br />across the United Kingdom
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <div>© 2025 L&C Cleaning Services Ltd. All rights reserved.</div>
              <div className="text-xs mt-1">Registered in England and Wales | Company No. 16561686</div>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}