'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Star, CheckCircle, ArrowRight, Home, Building, Calendar } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Mess is Our{' '}
              <span className="text-teal-600">Mission</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Professional cleaning services across the UK. From domestic homes to commercial offices, 
              we deliver spotless results with 100% satisfaction guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/booking" className="btn-primary text-lg px-8 py-4">
                Book Now
                <ArrowRight size={20} />
              </Link>
              <Link href="/services" className="btn-outline text-lg px-8 py-4">
                View Services
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-teal-500" size={16} />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-teal-500" size={16} />
                <span>2500+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-teal-500" size={16} />
                <span>Same Day Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Cleaning Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional cleaning solutions tailored to your needs. Choose from our range of services 
              designed to keep your space spotless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Domestic Cleaning */}
            <div className="service-card">
              <div className="service-icon">
                <Home size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Domestic Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Regular house cleaning including dusting, vacuuming, mopping, and bathroom cleaning.
              </p>
              <div className="text-2xl font-bold text-teal-600 mb-4">From £25</div>
              <Link href="/booking" className="btn-primary w-full justify-center">
                Book Now
              </Link>
            </div>

            {/* Office Cleaning */}
            <div className="service-card">
              <div className="service-icon">
                <Building size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Office Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Professional office cleaning including desk areas, meeting rooms, and washrooms.
              </p>
              <div className="text-2xl font-bold text-teal-600 mb-4">From £35</div>
              <Link href="/booking" className="btn-primary w-full justify-center">
                Book Now
              </Link>
            </div>

            {/* End of Tenancy */}
            <div className="service-card">
              <div className="service-icon">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">End of Tenancy</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive deep cleaning guaranteed to help you get your deposit back.
              </p>
              <div className="text-2xl font-bold text-teal-600 mb-4">From £150</div>
              <Link href="/booking" className="btn-primary w-full justify-center">
                Book Now
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary">
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don&apos;t just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="testimonial-card">
              <div className="star-rating mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                &quot;L&C Cleaning Services did an amazing job with our end of tenancy clean. 
                We got our full deposit back! Highly recommended.&quot;
              </p>
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <div className="text-sm text-gray-600">London</div>
            </div>

            {/* Testimonial 2 */}
            <div className="testimonial-card">
              <div className="star-rating mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                &quot;Regular cleaning service is fantastic. The team is professional, reliable, 
                and our house has never been cleaner.&quot;
              </p>
              <div className="font-semibold text-gray-900">Michael Brown</div>
              <div className="text-sm text-gray-600">Manchester</div>
            </div>

            {/* Testimonial 3 */}
            <div className="testimonial-card">
              <div className="star-rating mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                &quot;Outstanding carpet cleaning service. They removed stains I thought were 
                permanent. Will definitely use again.&quot;
              </p>
              <div className="font-semibold text-gray-900">Emma Wilson</div>
              <div className="text-sm text-gray-600">Birmingham</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-teal-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for a Spotless Space?
            </h2>
            <p className="text-xl mb-8 text-teal-100">
              Get your free quote today and experience the L&C difference. 
              Professional cleaning services across the UK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="bg-white text-teal-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center gap-2">
                Get Free Quote
                <ArrowRight size={20} />
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-teal-600 font-semibold py-4 px-8 rounded-lg transition-all inline-flex items-center gap-2">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
