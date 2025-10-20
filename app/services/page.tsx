'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, Home, Building, Calendar, Sparkles, Package } from 'lucide-react'

const services = [
  {
    id: 1,
    name: 'Domestic Cleaning',
    shortDescription: 'Regular house cleaning service',
    description: 'Regular house cleaning service including dusting, vacuuming, mopping, and bathroom cleaning. Perfect for maintaining a clean and healthy home environment.',
    price: 25,
    duration: '2-3 hours',
    icon: Home,
    features: [
      'Dusting all surfaces',
      'Vacuuming carpets and floors',
      'Mopping hard floors',
      'Bathroom cleaning',
      'Kitchen cleaning',
      'Bin emptying'
    ]
  },
  {
    id: 2,
    name: 'Office Cleaning',
    shortDescription: 'Professional office cleaning service',
    description: 'Professional office cleaning including desk areas, meeting rooms, kitchens, and washrooms. Maintaining a clean workspace for productivity.',
    price: 35,
    duration: '1-2 hours',
    icon: Building,
    features: [
      'Desk and workspace cleaning',
      'Meeting room maintenance',
      'Kitchen and break areas',
      'Washroom cleaning',
      'Floor vacuuming/mopping',
      'Waste removal'
    ]
  },
  {
    id: 3,
    name: 'End of Tenancy',
    shortDescription: 'Deep cleaning for moving out',
    description: 'Comprehensive deep cleaning service for tenants moving out. Guaranteed to help you get your deposit back with our thorough cleaning checklist.',
    price: 150,
    duration: '4-6 hours',
    icon: Calendar,
    features: [
      'Deep cleaning all rooms',
      'Oven and appliance cleaning',
      'Window cleaning (inside)',
      'Carpet steam cleaning',
      'Bathroom deep clean',
      'Deposit back guarantee'
    ]
  },
  {
    id: 4,
    name: 'Carpet & Upholstery',
    shortDescription: 'Professional carpet cleaning',
    description: 'Professional carpet and upholstery cleaning using advanced equipment. Removes stains, odors, and allergens for a fresh, clean finish.',
    price: 45,
    duration: '2-4 hours',
    icon: Package,
    features: [
      'Steam carpet cleaning',
      'Stain removal treatment',
      'Upholstery cleaning',
      'Odor elimination',
      'Allergen removal',
      'Fast drying process'
    ]
  },
  {
    id: 5,
    name: 'Deep Cleaning',
    shortDescription: 'Intensive deep cleaning service',
    description: 'Intensive cleaning service covering every corner of your property. Includes areas often missed in regular cleaning routines.',
    price: 80,
    duration: '4-5 hours',
    icon: Sparkles,
    features: [
      'Detailed cleaning all areas',
      'Inside appliances',
      'Light fixture cleaning',
      'Baseboard cleaning',
      'Cabinet fronts',
      'Window sill cleaning'
    ]
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-sky-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Cleaning Services
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Professional cleaning solutions tailored to your specific needs. 
              From regular domestic cleaning to specialized deep cleaning services.
            </p>
            <Link href="/booking" className="btn-primary text-lg px-8 py-4">
              Book Any Service
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <div key={service.id} className="card card-hover p-8">
                  <div className="flex items-start gap-6">
                    <div className="service-icon flex-shrink-0">
                      <IconComponent size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl font-bold text-teal-600">
                          From £{service.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          Duration: {service.duration}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">What&apos;s included:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link 
                        href={`/booking?service=${service.id}`}
                        className="btn-primary w-full sm:w-auto justify-center"
                      >
                        Book {service.name}
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Don&apos;t See What You Need?
            </h2>
            <p className="text-xl text-gray-600">
              We offer custom cleaning solutions for any requirement
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Custom Cleaning Solutions
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Whether you need post-construction cleaning, event cleanup, or specialized commercial services, 
                we can create a custom cleaning package that meets your exact requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary">
                  Get Custom Quote
                </Link>
                <Link href="/booking" className="btn-outline">
                  Book Standard Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose L&C Cleaning?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Team</h3>
              <p className="text-gray-600">
                Experienced, trained, and vetted cleaning professionals who take pride in their work.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="text-sky-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fully Insured</h3>
              <p className="text-gray-600">
                Complete insurance coverage for your peace of mind. Your property is protected.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Same-day service available. We work around your schedule, including weekends.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}