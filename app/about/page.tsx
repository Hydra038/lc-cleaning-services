import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Users, Award, Shield, Clock, Star, Heart } from 'lucide-react'

const stats = [
  { label: 'Happy Customers', value: '200+', icon: Users },
  { label: 'Established', value: '2025', icon: Award },
  { label: 'Services Completed', value: '500+', icon: Star },
  { label: 'Average Rating', value: '5.0', icon: Star }
]

const values = [
  {
    icon: Shield,
    title: 'Trustworthy & Reliable',
    description: 'All our team members are background checked, insured, and trained to the highest standards. You can trust us with your home or office.'
  },
  {
    icon: Heart,
    title: 'Attention to Detail',
    description: 'We take pride in our meticulous approach to cleaning. No corner is left unchecked, and every surface receives the care it deserves.'
  },
  {
    icon: Clock,
    title: 'Punctual & Professional',
    description: 'We respect your time and arrive when scheduled. Our professional team works efficiently while maintaining the highest quality standards.'
  }
]

const teamMembers = [
  {
    name: 'Lisa Thompson',
    role: 'Founder & Managing Director',
    description: 'With over 10 years in the cleaning industry, Lisa founded L&C Cleaning Services with a vision to provide exceptional cleaning services to homes and businesses across the UK.'
  },
  {
    name: 'Sarah Johnson',
    role: 'Operations Manager',
    description: 'Sarah ensures all our cleaning teams are properly trained and equipped. She oversees quality control and customer satisfaction for all our services.'
  },
  {
    name: 'Michael Chen',
    role: 'Customer Service Lead',
    description: 'Michael leads our customer service team, ensuring every client receives personalized attention and support throughout their cleaning service journey.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-sky-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About L&C Cleaning Services
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Your trusted partner for professional cleaning services across the UK. 
              We&apos;re committed to making your spaces spotless and your life easier.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  L&C Cleaning Services Ltd (Company No. 16561686) was officially incorporated in 
                  July 2025 with a clear mission: to provide exceptional cleaning services that 
                  exceed our customers&apos; expectations across the United Kingdom.
                </p>
                <p>
                  As a registered company in England and Wales, we&apos;re committed to operating with 
                  complete transparency and professionalism. We understand that your time is precious, 
                  and your space should be a sanctuary. That&apos;s why we&apos;ve built our business on the 
                  principles of trust, quality, and customer satisfaction.
                </p>
                <p>
                  Every member of our team is carefully vetted, thoroughly trained, and fully insured. 
                  We use eco-friendly products wherever possible and employ the latest cleaning 
                  techniques to ensure the best results for your home or business.
                </p>
                <p className="text-sm text-gray-500 italic">
                  Registered Office: England and Wales | Incorporated: 5th July 2025
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-400 to-sky-500 rounded-2xl p-12 h-96 flex items-center justify-center shadow-xl">
                <div className="text-white text-center">
                  <Users size={120} className="mx-auto mb-4 opacity-90" />
                  <h3 className="text-3xl font-bold">Professional Team</h3>
                  <p className="text-teal-50 mt-2">Dedicated to Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="text-teal-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="card p-8 text-center card-hover">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="text-teal-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The dedicated professionals behind our exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-sky-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Users className="text-white" size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-teal-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose L&C Cleaning?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="text-teal-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fully Insured & Bonded</h3>
                    <p className="text-gray-600">Complete protection for your peace of mind. Your property and belongings are fully covered.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="text-teal-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Trained Professionals</h3>
                    <p className="text-gray-600">All team members undergo comprehensive training and background checks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="text-sky-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Eco-Friendly Products</h3>
                    <p className="text-gray-600">Safe for your family, pets, and the environment. We use green cleaning solutions wherever possible.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="text-sky-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
                    <p className="text-gray-600">Same-day service available. We work around your schedule, including weekends and evenings.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="text-teal-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Satisfaction Guarantee</h3>
                    <p className="text-gray-600">Not happy with our service? We&apos;ll return within 24 hours to make it right, free of charge.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="text-sky-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Quality Equipment</h3>
                    <p className="text-gray-600">Professional-grade equipment and supplies for superior cleaning results.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-teal-600 to-sky-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of satisfied customers who trust L&C Cleaning Services 
              for their cleaning needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/booking" className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Book Now
              </a>
              <a href="/contact" className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}